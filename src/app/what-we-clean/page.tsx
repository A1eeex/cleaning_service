'use client';
import Link from 'next/link';
import React, { useState } from 'react';

const WhatWeCleaninPage = () => {
  const tabs = [
    {
      title: 'У КІМНАТІ',
      content:
        'Витираємо пил з усіх відкритих поверхонь, Охайно розставляємо взуття та складаємо ваші речі, Прибираємо та виносимо сміття, Заправляємо ліжка та міняємо постільну білизну',
    },
    {
      title: 'В КОРИДОРІ',
      content:
        'Completely synergize resource taxing relationships via premier niche markets. Professionally cultivate one-to-one customer service with robust ideas. Dynamically innovate resource-leveling customer service for state of the art customer service.',
    },
    {
      title: 'КУХНЯ',
      content:
        'Efficiently unleash cross-media information without cross-media value. Quickly maximize timely deliverables for real-time schemas. Dramatically maintain clicks-and-mortar solutions without functional solutions.',
    },
    {
      title: 'САНВУЗОЛ',
      content:
        'Efficiently unleash cross-media information without cross-media value. Quickly maximize timely deliverables for real-time schemas. Dramatically maintain clicks-and-mortar solutions without functional solutions.',
    },
  ];
  const [openTab, setOpenTab] = useState<number>(1);
  const color = 'orange';
  return (
<>
<h1 className='flex justify-center font-bold text-2xl'>Що входить у прибирання квартири</h1>
  <div className="flex flex-wrap ">
    <div className="w-full">
      <ul className="flex mb-0 list-none flex-wrap pt-3 pb-4 flex-row" role="tablist">
        {tabs.map((tab, index) => (
          <li key={index} className="mb-px mr-2 last:mr-0 flex-auto text-center">
            <Link
              className={
                "text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
                (openTab === index + 1
                  ? `text-white  bg-main-color`
                  : `text-main-color bg-white`)
              }
              onClick={(e) => {
                e.preventDefault();
                setOpenTab(index + 1);
              }}
              data-toggle={"tab"}
              href={`#link${index + 1}`}
              role="tablist"
            >
              {tab.title}
            </Link>
          </li>
        ))}
      </ul>
      <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
        <div className="px-4 py-5 flex-auto">
          <div className="tab-content tab-space">
            {tabs.map((tab, index) => (
              <div
                key={index}
                className={openTab === index + 1 ? "block" : "hidden"}
                id={`link${index + 1}`}
              >
                <p>{tab.content}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
</>

  );
};

export default WhatWeCleaninPage;
