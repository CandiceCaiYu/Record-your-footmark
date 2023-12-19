'use client'
import React, {useEffect, useState} from "react";
import * as echarts from "echarts";
import styles from './styles.module.scss'
import {usePage} from "@/app/components/Cities/usePage";
import {Button, DatePicker, Form, Space} from "antd";
import MDEditor from "@uiw/react-md-editor";

interface Props {
    provinceInfo: {
        code: number;
        name?: string
    }
    cleanProvinceCode: () => void
}


const Cities = ({provinceInfo, cleanProvinceCode}: Props) => {
    const [cityChart, setCityChart] = useState<echarts.ECharts>()
    const {
        currentCityInfo, isEditable, setIsEditable,
        handleDateChange, handleContentChange,
        handleSubmit
    } = usePage(provinceInfo, cityChart)


    useEffect(() => {
        const myChart = echarts.init(document.getElementById('city'));
        setCityChart(myChart)
    }, []);


    return (
        <div className={styles.city_wrapper}>
            <div id={'city'} style={{width: '1200px', height: '1080px'}}></div>
            <section className={styles.city_content}>
                <h2>{currentCityInfo?.provinceName}{currentCityInfo?.cityName && `- ${currentCityInfo.cityName}`}</h2>
                <Form labelCol={{span: 3}} wrapperCol={{span: 16}} size={"large"}>
                    <Form.Item hidden={isEditable} wrapperCol={{span: 6}}>
                        <Space>
                            <Button type={'primary'} onClick={() => setIsEditable(true)}>Edit</Button>
                        </Space>
                    </Form.Item>
                    <Form.Item label={'出发时间'} name={'date'} wrapperCol={{span: 6}}>
                        <DatePicker defaultValue={currentCityInfo?.date}
                                    onChange={handleDateChange}
                                    disabled={!isEditable}
                                    className={styles.datePicker}/>
                    </Form.Item>
                    <Form.Item label={'内容'} name={'content'} wrapperCol={{span: 20}}>
                        {isEditable ?
                            <MDEditor value={currentCityInfo?.content} onChange={handleContentChange}></MDEditor> :
                            <MDEditor.Markdown source={currentCityInfo?.content}></MDEditor.Markdown>}
                    </Form.Item>
                    <Form.Item hidden={!isEditable}>
                        <Space>
                            <Button htmlType={'reset'}>Cancel</Button>
                            <Button type="primary" htmlType={'submit'} onClick={handleSubmit}>Submit</Button>
                        </Space>
                    </Form.Item>
                </Form>

            </section>
        </div>
    )
}

export default Cities
