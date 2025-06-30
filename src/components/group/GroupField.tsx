'use client';

import CardField from '@/components/card/CardField';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import '@/styles/swiper.css';
import { Navigation, Pagination } from 'swiper/modules';
import { fieldData } from '@/modules/staticData';
import { useHomeStore } from '@/store/homeStore';
import { useEffect } from 'react';
import { FormattedSession } from '@/modules/homeType';

interface GroupFieldProps {
    generation: string;
    isDocument: boolean;
    first: FormattedSession;
    second: FormattedSession;
}

const GroupField = ({ generation, isDocument, first, second }: GroupFieldProps) => {
    const { setGeneration, setFirstSession, setIsDocument, setSecondSession } = useHomeStore();

    useEffect(() => {
        setGeneration(generation);
        setIsDocument(isDocument);
        setFirstSession(first);
        setSecondSession(second);
    }, []);

    return (
        <>
            <div className="md:hidden">
                <Swiper
                    className="w-[310px]"
                    modules={[Navigation, Pagination]}
                    slidesPerView={1}
                    pagination={{ clickable: true }}
                    navigation
                >
                    {fieldData.map((item, index) => (
                        <SwiperSlide key={index}>
                            <CardField
                                title={item.title}
                                subTitle={item.subTitle}
                                description={item.description}
                                imgSrc={item.imgSrc}
                                hoverSrc={item.hoverSrc}
                                state={isDocument}
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
            <div className="hidden md:grid grid-cols-3 lg:gap-7 gap-5">
                {fieldData.map((item, index) => (
                    <CardField
                        key={index}
                        title={item.title}
                        subTitle={item.subTitle}
                        description={item.description}
                        imgSrc={item.imgSrc}
                        hoverSrc={item.hoverSrc}
                        state={isDocument}
                    />
                ))}
            </div>
        </>
    );
};

export default GroupField;
