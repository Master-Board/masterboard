import React from "react";

export default  (props) => {
    return (
        <section className="featured" style={{
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundImage: `${props.img}`,// 대문사진
            backgroundColor: '#111'
        }}>
            <div className="featured-vertical">
                <div className="featured-horizontal">
                    <div className="featured-name" style={{color: '#fff'}}><div style={{color: '#ccc', style: 'inline'}}>추천 게임</div> {props.featuredData.title === 'parade' ? "퍼레이드" : props.featuredData.title === 'deception' ? "디셉션" : props.featuredData.title === 'tichu' ? "티츄" : props.featuredData.title === 'fertility' ? "퍼틸리티" : null }</div>
                    <div className="featured-info">
                        <div className="featured-points"> {props.featuredData.grade} points / 평점</div> 
                        <div className="featured-seasons" style={{color: '#c44'}}> {props.featuredData.people}명 / 인원수</div>
                    </div>
                    <div className="featured-description">{props.featuredData.content}</div>
                    <div className="featured-buttons">
                        <a className="featured-playButton" href="/">▶ Play</a>
                        <a className="featured-howtoButton" href="/">How to</a>
                    </div>
                </div>
            </div>
        </section>
    );
}