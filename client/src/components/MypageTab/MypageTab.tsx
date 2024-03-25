import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import '../../styles/MypageTab.css'
import WriteList from './WriteList';
import LikeList from './LikeList';
import Project from './Project';

export default function MypageTab() {
  const [index, setIndex] = useState(0);

	const tabArray=[
	{
    tabId: 0,
    tabTitle: '작성한 글 목록',
    tabCont:(
      <WriteList/>
    )
	},
	{
		tabId: 1,
		tabTitle: '관심한 글 목록',
		tabCont:(
      <LikeList/>
    )
	},
  {	
    tabId: 2,
		tabTitle:  '지원한 프로젝트',
		tabCont:(
      <Project/>
    )
	}
];
	let navigate = useNavigate();

  const ClickTab = (tabId: number) => {
    setIndex(tabId);
  }

  useEffect(() => {
    setIndex(0);
  }, []);
  return (
    <div>
      <div>
        <div>
          <div>
          </div>
          <div className="tap_container">
            {tabArray.map((item) => (
              <div className="tap"
                key={item.tabId}
                onClick={() => ClickTab(item.tabId)}
                // isActive={index === item.tabId}
              >
                {item.tabTitle}
              </div>
            ))}
          </div>
          <div>
            {tabArray
              .filter((item) => index === item.tabId)
              .map((item) => (
                <div>{item.tabCont}</div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}