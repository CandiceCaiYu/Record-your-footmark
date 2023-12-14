'use client'
import React, {useEffect, useState} from "react";
import * as echarts from "echarts";
import {AxiosResponse} from "axios";
import {APIRequest} from "@/utils/API/request";
import {API_COUNTRIES} from "@/utils/API/mapRequests";
import {provincesOptionConfig} from "@/app/components/Provinces/optionConfig";
import {GeoJSONSourceInput} from "echarts/types/src/coord/geo/geoTypes";
import {API_TRAVEL_INFO_PROVINCE} from "@/utils/API/travelRequest";

interface Props {
    handleClick: (provinceCode: number) => void
}

const Provinces = (props: Props) => {
    const [chinaGeo, setChinaGeo] = useState<GeoJSONSourceInput>()
    const [provinceChart, setProvinceChart] = useState<echarts.ECharts>()
    const [provinceTravelInfo, setProvinceTravelInfo] = useState()

    const getChinaGeo = async () => {
        try {
            const res = await APIRequest({url: API_COUNTRIES})
            handleChinaGeoData(res)
        } catch (e) {
            // TODO fail log
            return
        }
    }

    const getProvinceDataInfo = async () => {
        try {
            const result = await APIRequest({method: 'GET', url: API_TRAVEL_INFO_PROVINCE})
            setProvinceTravelInfo(result?.data || [])
        } catch (e) {
            // TODO fail log
        }
    }

    const handleChinaGeoData = (res?: AxiosResponse<any, any>) => {
        const data = res?.data
        setChinaGeo(data)
    }

    const handleClickForCallCity = (params: echarts.ECElementEvent) => {
        if (typeof chinaGeo === 'string') return;
        // dataIndex-data.length
        const province = chinaGeo?.features[params.dataIndex].properties
        province && props.handleClick(province.adcode)
    }


    useEffect(() => {
        const myChart = echarts.init(document.getElementById('province'));
        setProvinceChart(myChart)
        void getChinaGeo()
        void getProvinceDataInfo()

    }, [])


    useEffect(() => {
        if (!chinaGeo) return;
        echarts.registerMap('china', chinaGeo)
        provinceChart?.setOption(provincesOptionConfig([]))
        provinceChart?.on('click', handleClickForCallCity)
    }, [chinaGeo])

    useEffect(() => {
        provinceChart?.setOption(provincesOptionConfig(provinceTravelInfo))
    }, [provinceTravelInfo]);
    return (
        <div id={'province'} style={{width: '100%', height: '100vh'}}></div>
    )
}

export default Provinces
