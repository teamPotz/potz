function PostContents() {
  return (
    <div className='potz_container' style={backgroundStyle}>
      <div style={imgContainer}>
        <img
          width={420}
          height={420}
          src={`http://localhost:5000${postDatas.imageUrl}`}
        />
        <div style={TopStyle}>
          <ButtonWrap onClick={() => navigate(-1)} style={marginLeftStyle}>
            <BackIcon />
          </ButtonWrap>
          <div style={{ display: 'flex' }}>
            <ButtonWrap>
              <SaleIcon />
            </ButtonWrap>
            <ButtonWrap style={marginRightStyle}>
              <BurgerIcon />
            </ButtonWrap>
          </div>
        </div>
        <div style={linkStyle}>
          <LinkIcon />
          <a style={fontStyleLink} href={postDatas.orderLink}>
            <span>배달앱 링크 바로가기</span>
          </a>
        </div>
      </div>
      <div>
        <div className='contents_container'>
          <div style={storeFont}>
            <span>{postDatas.storeName}</span>
          </div>
          <div style={marginBottomStyle}>
            <div style={fontStyleLink2}>
              <span>{postDatas.category.name}</span>
            </div>
            <div style={fontStyle}>
              <span>만날 장소</span>
              <span>{postDatas.meetingLocation}</span>
            </div>
            <div style={fontStyle}>
              <span>모인 금액</span>
              <div>
                {/* {totalFee ? <span>{totalFee}</span> : <span>0</span>}
                <span>원</span> */}
              </div>
            </div>
          </div>

          <Particiate>
            {postDatas.author.profile ? (
              <img
                width={46}
                height={46}
                src={
                  'http://localhost:5000/' + postDatas.author.profile.imageUrl
                }
                style={paddingStyle}
              />
            ) : (
              <img width={38} height={38} src={logoImg} style={paddingStyle} />
            )}
            <div>
              <span style={fontColored}>
                {postDatas.deliveryPot.participants.length}
              </span>
              <span style={fontColored}>/</span>
              <span style={fontColored}>{postDatas.recruitment}</span>
              <span>명 참여중</span>
            </div>
          </Particiate>
        </div>
        <Divider>
          <hr />
        </Divider>
        <div className='contents_container'>
          <div style={fontStyle1}>
            <span>지금 모집중인</span>
            <span style={fontStyle2}>{postDatas.category.name}</span>
          </div>
        </div>
        {categoryPostData ? (
          <CategorySearch categoryPostData={categoryPostData}></CategorySearch>
        ) : null}
        <div style={navbarStyle}>
          <nav style={navStyles}>
            <div style={navFontContainer}>
              <div style={fontStyle3}>
                <span style={coloredFont}>
                  {postDatas.deliveryFees?.[0]?.fee ? (
                    Math.round(
                      postDatas.deliveryFees[0].fee /
                        postDatas.deliveryPot.participants.length
                    )
                  ) : (
                    <span>무료</span>
                  )}
                </span>
                {postDatas.deliveryFees?.[0]?.fee ? (
                  <span>원씩 배달</span>
                ) : (
                  <span>배달</span>
                )}
              </div>
              <div style={fontStyle4}>
                <span>현재 배달비</span>
                <span>
                  {postDatas.deliveryFees?.[0]?.fee ? (
                    postDatas.deliveryFees[0].fee
                  ) : (
                    <span>무료</span>
                  )}
                </span>
              </div>
            </div>
            <EnterStyle onClick={enterChatRoom}>
              <EnterIcon />
            </EnterStyle>
          </nav>
        </div>
      </div>
    </div>
  );
}

export default PostContents;
