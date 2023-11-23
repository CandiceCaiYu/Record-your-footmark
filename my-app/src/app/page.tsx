'use client';
import * as echarts from "echarts";
import {option} from "@/components/CommonEcharts";
import React, {useEffect} from "react";
import {chinaGeo} from "@/assets/chinaGeo";

export default function Home() {
    useEffect(() => {
        const myChart = echarts.init(document.getElementById('main'));
        echarts.registerMap('china', chinaGeo)
        myChart.setOption(option)
    }, [])

    return (
        <div>
            <div id={'main'} style={{width: '1200px', height: '1080px'}}></div>
        </div>
    )
}
