'use client'
import React, {useEffect, useState} from "react";
import * as echarts from "echarts";
import {option} from "@/components/CommonEcharts";
import {APIRequest} from "@/utils/API/request";
import {API_CITIES} from "@/utils/API/mapRequests";

interface Props {
    provinceCode?: number;
    cleanProvinceCode: () => void
}

const Cities = ({provinceCode, cleanProvinceCode}: Props) => {
    const [cityGeo, setCityGeo] = useState()
    const getCityGeo = async (provinceCode: number) => {
        try {

            const res = await APIRequest({url: API_CITIES(provinceCode)})
            const data = res?.data
            setCityGeo(data)
        } catch (e) {
            return
        }
    }
    const handleBack = () => {
        cleanProvinceCode()
    }
    useEffect(() => {
        if (!cityGeo) return;
        const myChart = echarts.init(document.getElementById('city'));
        echarts.registerMap('china', cityGeo)
        myChart.setOption(option)
        myChart.on('click', handleBack)
    }, [cityGeo])

    useEffect(() => {
        provinceCode && getCityGeo(provinceCode)
    }, [provinceCode]);

    return (
        <div id={'city'} style={{width: '1200px', height: '1080px'}}></div>
    )
}

export default Cities
