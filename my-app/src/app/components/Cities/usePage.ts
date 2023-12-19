import {useEffect, useState} from "react";
import * as echarts from "echarts";
import {GeoJSONSourceInput} from "echarts/types/src/coord/geo/geoTypes";
import {APIRequest} from "@/utils/API/request";
import {API_CITIES} from "@/utils/API/mapRequests";
import {API_TRAVEL_INFO_CITY} from "@/utils/API/travelRequest";
import {citiesOptionConfig, City_info} from "@/app/components/Cities/optionConfig";
import {Dayjs} from "dayjs";

export const usePage = (provinceInfo?: { code: number, name?: string }, cityChart?: echarts.ECharts) => {

    const [cityGeo, setCityGeo] = useState<GeoJSONSourceInput>()
    const [cityTravelInfo, setCityTravelInfo] = useState<Array<City_info>>()
    const [currentCityInfo, setCurrentCityInfo] = useState<City_info>()
    const [isEditable, setIsEditable] = useState(false)

    const getCityGeo = async (provinceCode: number) => {
        try {
            const res = await APIRequest({url: API_CITIES(provinceCode)})
            const data = res?.data
            setCityGeo(data)
        } catch (e) {
            return
        }
    }

    const getCityTravel = async () => {
        try {
            const result = await APIRequest({url: API_TRAVEL_INFO_CITY})
            setCityTravelInfo(result?.data || [])
        } catch (e) {
            return
        }
    }
    const handleClick = (params: echarts.ECElementEvent) => {
        // void handleSaveCityInfo(params)
        if (!params) return;
        const selectCityInfo = cityGeo?.features?.[params.dataIndex - cityTravelInfo?.length]

        setCurrentCityInfo({
            ...currentCityInfo,
            cityName: params.name,
            cityCode: selectCityInfo.properties.adcode,
            center: selectCityInfo.properties.center,
        })
    }

    const handleDateChange = (date: Dayjs | null, dateString: string) => {
        setCurrentCityInfo({
            ...currentCityInfo,
            date: date || undefined
        })
    }

    const handleContentChange = (value?: string) => {
        setCurrentCityInfo({
            ...currentCityInfo,
            content: value
        })
    }

    const handleSubmit = async () => {
        await handleSaveCityInfo()
        setIsEditable(false)
    }

    useEffect(() => {
        setCurrentCityInfo({
            ...currentCityInfo,
            ...(cityTravelInfo?.[0] || {}),
        })
    }, [cityTravelInfo]);

    const handleSaveCityInfo = async () => {
        if (typeof cityGeo === 'string') return;
        await APIRequest({
            method: 'post', url: API_TRAVEL_INFO_CITY, data: {
                ...currentCityInfo,
                id: Date.now(),
                value: [...(currentCityInfo?.center || []), Math.random() * 100 + 3]
            }
        })
        void getCityTravel()
    }
    useEffect(() => {
        if (!cityGeo || !cityChart) return;

        echarts.registerMap('city', cityGeo)
        cityChart.setOption(citiesOptionConfig([]))
        cityChart.on('click', handleClick)
    }, [cityGeo])

    useEffect(() => {
        cityChart?.setOption(citiesOptionConfig(cityTravelInfo))
    }, [cityTravelInfo]);


    useEffect(() => {
        if (!provinceInfo?.code) return
        setCurrentCityInfo({
            ...currentCityInfo,
            provinceName: provinceInfo.name,
            provinceCode: provinceInfo.code
        })
        void getCityGeo(provinceInfo.code)
        void getCityTravel()
    }, [provinceInfo]);

    return {
        currentCityInfo, isEditable, setIsEditable, handleDateChange, handleContentChange, handleSubmit
    }
}
