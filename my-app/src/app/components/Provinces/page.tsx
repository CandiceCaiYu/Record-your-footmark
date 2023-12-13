'use client'
import React, {useEffect, useState} from "react";
import * as echarts from "echarts";
import {AxiosResponse} from "axios";
import {APIRequest} from "@/utils/API/request";
import {API_COUNTRIES} from "@/utils/API/mapRequests";
import {provincesOptionConfig} from "@/app/components/Provinces/optionConfig";
import {GeoJSONSourceInput} from "echarts/types/src/coord/geo/geoTypes";

interface Props {
    handleClick: (provinceCode: number) => void
}

const Provinces = (props: Props) => {
    const [chinaGeo, setChinaGeo] = useState<GeoJSONSourceInput>()
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
    }

    const handleClickForCallCity = (params: echarts.ECElementEvent) => {
        if (typeof chinaGeo === 'string') return;
        // dataIndex-data.length
        const province = chinaGeo?.features[params.dataIndex].properties
        province && props.handleClick(province.adcode)
    }

    useEffect(() => {
        if (!chinaGeo) return;
        const myChart = echarts.init(document.getElementById('province'));
        echarts.registerMap('china', chinaGeo)
        myChart.setOption(provincesOptionConfig)
        myChart.on('click', handleClickForCallCity)
    }, [chinaGeo])

    useEffect(() => {
        void getChinaGeo()

    }, [])
    return (
        <div id={'province'} style={{width: '100%', height: '100vh'}}></div>
    )
}

export default Provinces
