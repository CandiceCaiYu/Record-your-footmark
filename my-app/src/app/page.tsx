'use client';
import * as echarts from "echarts";
import {option} from "@/components/CommonEcharts";
import React, {useEffect, useState} from "react";
import {APIRequest} from "@/utils/API/request";
import {API_CITIES, API_COUNTRIES} from "@/utils/API/mapRequests";

export default function Home() {
    const [chinaGeo, setChinaGeo] = useState()

    const getChinaGeo = async () => {
        const res = await APIRequest({url: API_COUNTRIES})
        setChinaGeo(res?.data)
    }

    const getCityGeo = async (provinceCode: string) => {
        const res = await APIRequest({url: API_CITIES(provinceCode)})
        return res?.data
    }

    useEffect(() => {
        getChinaGeo()

    }, [])

    useEffect(() => {
        if (!chinaGeo) return;
        const myChart = echarts.init(document.getElementById('main'));
        echarts.registerMap('china', chinaGeo)
        myChart.setOption(option)
    }, [chinaGeo])

    return (
        <div>
            <div id={'main'} style={{width: '1200px', height: '1080px'}}></div>
        </div>
    )
}
