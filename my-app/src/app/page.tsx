'use client';
import React, {useState} from "react";
import Provinces from "@/app/components/Provinces/page";
import Cities from "@/app/components/Cities/page";
import styles from './styles.module.scss'
import {Button} from "antd";

export default function Home() {
    const [provinceCode, setProvinceCode] = useState<number>()


    const cleanProvinceCode = () => {
        setProvinceCode(undefined)

    }
    const getCityGeo = (provinceCode: number) => {
        setProvinceCode(provinceCode)
    }

    return (
        <div className={styles.main}>
            {provinceCode &&
                <Button type={'text'} className={styles.back_button}
                        onClick={cleanProvinceCode}> {'< < < Back'}</Button>}
            {provinceCode ?
                <Cities provinceCode={provinceCode} cleanProvinceCode={cleanProvinceCode}/>
                :
                <Provinces handleClick={getCityGeo}/>
            }
        </div>
    )
}
