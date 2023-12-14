'use client'
import React, {useEffect, useState} from "react";
import * as echarts from "echarts";
import {APIRequest} from "@/utils/API/request";
import {API_CITIES} from "@/utils/API/mapRequests";
import {citiesOptionConfig} from "@/app/components/Cities/optionConfig";
import {GeoJSONSourceInput} from "echarts/types/src/coord/geo/geoTypes";
import styles from './styles.module.scss'
import {API_TRAVEL_INFO_CITY} from "@/utils/API/travelRequest";

interface Props {
    provinceCode?: number;
    cleanProvinceCode: () => void
}

const Cities = ({provinceCode, cleanProvinceCode}: Props) => {
    const [cityChart, setCityChart] = useState<echarts.ECharts>()

    const [cityGeo, setCityGeo] = useState<GeoJSONSourceInput>()
    const [cityTravelInfo, setCityTravelInfo] = useState()
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
        if (typeof cityGeo === 'string') return;
        const currentCityInfo = cityGeo?.features?.[params.dataIndex]
        console.log(currentCityInfo)
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
        const myChart = echarts.init(document.getElementById('city'));
        setCityChart(myChart)
    }, []);

    useEffect(() => {
        if (!provinceCode) return
        void getCityGeo(provinceCode)
        void getCityTravel()
    }, [provinceCode]);

    return (
        <div className={styles.city_wrapper}>
            <div id={'city'} style={{width: '1200px', height: '1080px'}}></div>
            <section className={styles.city_content}>
                <h2>四川省-成都市</h2>
                <p>2012-12-11</p>
                <article>
                    宽窄巷子
                </article>
            </section>
        </div>
    )
}

export default Cities
