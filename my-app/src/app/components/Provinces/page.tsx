'use client'
import React, {useEffect, useState} from "react";
import * as echarts from "echarts";
import {option} from "@/components/CommonEcharts";
import {AxiosResponse} from "axios";
import {APIRequest} from "@/utils/API/request";
import {API_COUNTRIES} from "@/utils/API/mapRequests";

interface Props {
    handleClick: (provinceCode: number) => void
}

const Provinces = (props: Props) => {
    const [chinaGeo, setChinaGeo] = useState()
    const [provinceNameAndCodeMap, setProvinceNameAndCodeMap] = useState<Record<string, number>>({})
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

    const handleClickForCallCity = (params: echarts.ECElementEvent) => {
        const provinceCode = provinceNameAndCodeMap[params.name]
        props.handleClick(provinceCode)
    }

    useEffect(() => {
        if (!chinaGeo) return;
        const myChart = echarts.init(document.getElementById('province'));
        echarts.registerMap('china', chinaGeo)
        myChart.setOption(option)
        myChart.on('click', handleClickForCallCity)
    }, [chinaGeo])

    useEffect(() => {
        void getChinaGeo()

    }, [])
    return (
        <div id={'province'} style={{width: '1200px', height: '980px'}}></div>
    )
}

export default Provinces
