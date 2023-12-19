'use client';
import React, {useState} from "react";
import Provinces, {ProvinceInfoProps} from "@/app/components/Provinces/page";
import Cities from "@/app/components/Cities/page";
import styles from './styles.module.scss'
import {Button} from "antd";


export default function Home() {
    const [provinceInfo, setProvinceInfo] = useState<ProvinceInfoProps>()

    const cleanProvinceCode = () => {
        setProvinceCode(undefined)

    }
    const getCityGeo = (params: ProvinceInfoProps) => {
        setProvinceInfo(params)
    }
    return (
        <div className={styles.main}>
            {provinceInfo?.code &&
                <Button type={'text'} className={styles.back_button}
                        onClick={cleanProvinceCode}> {'< < < Back'}</Button>}
            {provinceInfo?.code ?
                <Cities provinceInfo={provinceInfo} cleanProvinceCode={cleanProvinceCode}/>
                :
                <Provinces handleClick={getCityGeo}/>
            }
        </div>
    )
}
