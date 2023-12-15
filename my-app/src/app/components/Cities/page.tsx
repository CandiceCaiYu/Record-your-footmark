'use client'
import React, {useEffect, useState} from "react";
import * as echarts from "echarts";
import styles from './styles.module.scss'
import {usePage} from "@/app/components/Cities/usePage";

interface Props {
    provinceCode?: number;
    cleanProvinceCode: () => void
}

const Cities = ({provinceCode, cleanProvinceCode}: Props) => {
    const [cityChart, setCityChart] = useState<echarts.ECharts>()
    const {cityTravelInfo} = usePage(provinceCode, cityChart)


    useEffect(() => {
        const myChart = echarts.init(document.getElementById('city'));
        setCityChart(myChart)
    }, []);


    const city = cityTravelInfo?.[0] || {}
    return (
        <div className={styles.city_wrapper}>
            <div id={'city'} style={{width: '1200px', height: '1080px'}}></div>
            <section className={styles.city_content}>
                <h2>{city.provinceName}{city.cityName && `- ${city.cityName}}`}</h2>
                <p>{city.date}</p>
                <article>
                    {city.content}
                </article>
            </section>
        </div>
    )
}

export default Cities
