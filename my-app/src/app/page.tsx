'use client';
import * as echarts from "echarts";
import {option} from "@/components/CommonEcharts";
import React, {useEffect, useState} from "react";
import {APIRequest} from "@/utils/API/request";
import {API_CITIES, API_COUNTRIES} from "@/utils/API/mapRequests";
import {AxiosResponse} from "axios";

export default function Home() {
    const [chinaGeo, setChinaGeo] = useState()
    const [provinceNameAndCodeMap, setProvinceNameAndCodeMap] = useState<Record<string, number>>({})
    const [cityGeo, setCityGeo] = useState()


    const handleMapClick = (params: echarts.ECElementEvent) => {
        const provinceCode = provinceNameAndCodeMap[params.name]
        getCityGeo(provinceCode)
    }


    const getChinaGeo = async () => {
        try {
            const res = await APIRequest({url: API_COUNTRIES})
            handleChinaGeoData(res)
        } catch (e) {
            // TODO fail log
            return
        }
    }

    const handleChinaGeoData = (res?: AxiosResponse<any, any>) => {
        const data = res?.data
        setChinaGeo(data)
        if (data) {
            const result: Record<string, number> = {}
            data.features.forEach((item: { properties: { name: string, adcode: number } }) => {
                result[item.properties.name] = item.properties.adcode
            })
            setProvinceNameAndCodeMap(result)
        }
    }

    const getCityGeo = async (provinceCode: number) => {
        const res = await APIRequest({url: API_CITIES(provinceCode)})
        const data = res?.data
        setCityGeo(data)
    }
    const handleBack = () => {
        void getChinaGeo()
    }

    useEffect(() => {
        void getChinaGeo()

    }, [])

    useEffect(() => {
        if (!chinaGeo) return;
        const myChart = echarts.init(document.getElementById('main'));
        echarts.registerMap('china', chinaGeo)
        myChart.setOption(option)
        myChart.on('click', handleMapClick)
    }, [chinaGeo])

    useEffect(() => {
        if (!cityGeo) return;
        const myChart = echarts.init(document.getElementById('main'));
        echarts.registerMap('china', cityGeo)
        myChart.setOption(option)
        myChart.on('click', handleBack)
    }, [cityGeo])

    return (
        <div>
            <div id={'main'} style={{width: '1200px', height: '1080px'}}></div>
        </div>
    )
}
