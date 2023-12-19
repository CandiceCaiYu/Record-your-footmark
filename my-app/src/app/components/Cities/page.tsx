'use client'
import React, {useEffect, useState} from "react";
import * as echarts from "echarts";
import styles from './styles.module.scss'
import {usePage} from "@/app/components/Cities/usePage";
import {DatePicker, Form} from "antd";
import {City_info} from "@/app/components/Cities/optionConfig";
import {Dayjs} from "dayjs";

interface Props {
    provinceCode?: number;
    cleanProvinceCode: () => void
}


const Cities = ({provinceCode, cleanProvinceCode}: Props) => {
    const [cityChart, setCityChart] = useState<echarts.ECharts>()
    const {cityTravelInfo} = usePage(provinceCode, cityChart)
    const [currentCityInfo, setCurrentCityInfo] = useState<City_info>(cityTravelInfo?.[0] || {})

    const handleOnChange = (date: Dayjs | null, dateString: string) => {
        setCurrentCityInfo({
            ...currentCityInfo,
            date: date || undefined
        })
    }


    useEffect(() => {
        const myChart = echarts.init(document.getElementById('city'));
        setCityChart(myChart)
    }, []);


    return (
        <div className={styles.city_wrapper}>
            <div id={'city'} style={{width: '1200px', height: '1080px'}}></div>
            <section className={styles.city_content}>
                <h2>{currentCityInfo.provinceName}{currentCityInfo.cityName && `- ${currentCityInfo.cityName}}`}</h2>
                <Form labelCol={{span: 3}} wrapperCol={{span: 16}} size={"large"}>
                    <Form.Item label={'出发时间'} name={'date'} wrapperCol={{span: 6}}>
                        <DatePicker defaultValue={currentCityInfo?.date}
                                    onChange={handleOnChange}
                                    className={styles.datePicker}/>
                    </Form.Item>
                </Form>
                <article>
                    {currentCityInfo.content}
                </article>
            </section>
        </div>
    )
}

export default Cities
