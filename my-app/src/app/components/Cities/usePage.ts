import {useEffect, useState} from "react";
import * as echarts from "echarts";
import {GeoJSONSourceInput} from "echarts/types/src/coord/geo/geoTypes";
import {APIRequest} from "@/utils/API/request";
import {API_CITIES} from "@/utils/API/mapRequests";
import {API_TRAVEL_INFO_CITY} from "@/utils/API/travelRequest";
import {citiesOptionConfig, City_info} from "@/app/components/Cities/optionConfig";

export const usePage = (provinceCode?: number, cityChart?: echarts.ECharts) => {

    const [cityGeo, setCityGeo] = useState<GeoJSONSourceInput>()
    const [cityTravelInfo, setCityTravelInfo] = useState<Array<City_info>>()
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
    }

    const handleSaveCityInfo = async (params: echarts.ECElementEvent) => {
        if (typeof cityGeo === 'string') return;
        const currentCityInfo = cityGeo?.features?.[params.dataIndex - cityTravelInfo?.length]
        console.log('currentCityInfo...', currentCityInfo)
        await APIRequest({
            method: 'post', url: API_TRAVEL_INFO_CITY, data: {
                id: Date.now(),
                name: currentCityInfo?.properties.name,
                data: [...currentCityInfo?.properties.center, 1]
            }
        })
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
        if (!provinceCode) return
        void getCityGeo(provinceCode)
        void getCityTravel()
    }, [provinceCode]);

    return {
        cityTravelInfo
    }
}
