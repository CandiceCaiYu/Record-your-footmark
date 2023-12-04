'use client';
import React, {useState} from "react";
import Provinces from "@/app/components/Provinces/page";
import Cities from "@/app/components/Cities/page";
import styles from './styles.module.scss'

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
            {provinceCode ?
                <Cities provinceCode={provinceCode} cleanProvinceCode={cleanProvinceCode}/>
                :
                <Provinces handleClick={getCityGeo}/>
            }
        </div>
    )
}
