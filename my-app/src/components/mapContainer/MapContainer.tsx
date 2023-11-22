"use client"

import { useEffect } from "react";
import styles from "./MapContainer.module.scss";
import AMapLoader from "@amap/amap-jsapi-loader";

export default function MapContainer() {
    let map: { destroy: () => void; } | null = null;

    useEffect(() => {
        AMapLoader.load({
            key: "054a93f87bf7481a99b8d26e9dd429fb", // 申请好的Web端开发者Key，首次调用 load 时必填
            version: "2.0", // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
            plugins: [], // 需要使用的的插件列表，如比例尺'AMap.Scale'等
        })
            .then((AMap) => {
                const disCountry = new AMap.DistrictLayer.Country({
                    zIndex:10,
                    SOC:'CHN',
                    depth:1,
                    styles:{
                        'nation-stroke':'#f99000',
                        'coastline-stroke':'#0088ff',
                        'province-stroke':'grey',
                    }
                })
                map = new AMap.Map("container", {
                    zooms: [4, 8],
                    center:[106.122082,33.719192],
                    zoom: 4,
                    isHotspot:false,
                    defaultCursor:'pointer',
                    layers:[
                        disCountry
                    ],
                    viewMode:'3D',
                    // mapStyle:'amap://styles/darkblue',
                });
            })
            .catch((e) => {
                console.log(e);
            });

        return () => {
            map?.destroy();
        };
    }, []);

    return (
        <div
            id="container"
            className={styles.mpp_container}
            style={{ height: "800px" }}
        ></div>
    );
}
