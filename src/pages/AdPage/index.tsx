// CSS AND BOOTSTRAP
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import AdItem from '../../components/partials/AdItem/index';
import Fake from '../../components/partials/Fake';
import Slide from '../../components/partials/ImageSlide';
import useApi, { Ad } from '../../helpers/OlxApi';
import * as Styled from './styles';

const AdPage = () => {
// API CALL AND HOOK
    const api = useApi();
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [adInfo, setAdInfo] = useState<Ad>(Object);

    useEffect(()=>{
        const getAdInfo = async (id: string | undefined) => {
            const json = await api.getAd(id, true);
            setAdInfo(json);
            setLoading(false);
        }
        getAdInfo(id);
    }, []);

    const formatDate = (date: string) => {
        let cDate = new Date(date);
        let months = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
        let cDay = cDate.getDate();
        let cMonth = cDate.getMonth();
        let cYear = cDate.getFullYear();
        return `${cDay} de ${months[cMonth]} de ${cYear}`;
    }

    return (
        <Styled.Wrapper>
            {adInfo.category &&
                <Styled.Breadcrumb className='breadcrumb'>
                    <Styled.BreadcrumbSpan>Você está aqui:</Styled.BreadcrumbSpan>
                    <Styled.BreadcrumbLink to="/">Home</Styled.BreadcrumbLink>
                    <Styled.BreadcrumbSpan>/</Styled.BreadcrumbSpan>
                    <Styled.BreadcrumbLink to={`/ads?state=${adInfo.stateName}`}>{adInfo.stateName}</Styled.BreadcrumbLink>
                    <Styled.BreadcrumbSpan>/</Styled.BreadcrumbSpan>
                    <Styled.BreadcrumbLink to={`/ads?state=${adInfo.stateName}&cat=${adInfo.category.slug}`}>{adInfo.category.name}</Styled.BreadcrumbLink>
                    <Styled.BreadcrumbSpan>/</Styled.BreadcrumbSpan>
                    {adInfo.title}
                </Styled.Breadcrumb>
            }
            <Styled.ItemPageContainer>
                <Styled.PageLeftSide>
                    <Styled.Box>
                        <Styled.ItemImage>
                            {loading && <Fake height={300} />}
                            {adInfo.images &&
                                <Slide images={adInfo.images}/>
                            }
                        </Styled.ItemImage>
                        <Styled.ItemInfo>
                            <Styled.ItemName>
                                {loading && <Fake height={20} />}
                                {adInfo.title &&
                                    <Styled.ItemNameTitle>{adInfo.title}</Styled.ItemNameTitle>
                                }   
                                {adInfo.dateCreated &&
                                    <Styled.ItemNameSmall>Criado em {formatDate(adInfo.dateCreated)}</Styled.ItemNameSmall>
                                }
                            </Styled.ItemName>
                            <Styled.ItemDescription>
                                {loading && <Fake height={100} />}
                                {adInfo.description &&
                                    <h5>{adInfo.description}</h5>
                                }
                                <hr />
                                {adInfo.views &&
                                    <Styled.ItemDescriptionSmall>Visualizações: {adInfo.views}</Styled.ItemDescriptionSmall>
                                }
                            </Styled.ItemDescription>
                        </Styled.ItemInfo>
                    </Styled.Box>
                </Styled.PageLeftSide>
                <Styled.PageRightSide>
                    <Styled.Box className="box-padding">
                        {loading && <Fake height={20} />}
                        {adInfo.priceNegotiable && 
                            "Preço Negociável"
                        }
                        {!adInfo.priceNegotiable && adInfo.price &&
                            <Styled.BoxPrice className="price">Preço: <Styled.BoxPriceSpan>R$ {adInfo.price}</Styled.BoxPriceSpan></Styled.BoxPrice>
                        }
                    </Styled.Box>
                    {loading && <Fake height={50} />}
                    {adInfo.userInfo &&
                        <Styled.SellerInfoArea>
                            <Styled.SellerContactLink href={`mailto:${adInfo.userInfo.email}`} target="_blank" className='btn btn-primary contactSellerLink'>Fale com o vendedor</Styled.SellerContactLink>
                            <Styled.Box className="box-padding">
                                <Styled.BoxStrong>{adInfo.userInfo.name}</Styled.BoxStrong>
                                <Styled.BoxSmall>E-mail: {adInfo.userInfo.email}</Styled.BoxSmall>
                                <Styled.BoxSmall>Estado: {adInfo.stateName}</Styled.BoxSmall>
                            </Styled.Box>
                        </Styled.SellerInfoArea>
                    }
                </Styled.PageRightSide>
            </Styled.ItemPageContainer>
            {adInfo.others &&
                <Styled.OthersArea>
                    <Styled.OthersTitle>Outras ofertas do vendedor</Styled.OthersTitle>
                    <Styled.OthersList>
                        {adInfo.others.map((i, k)=>
                            <AdItem key={k} data={i} />
                        )}
                    </Styled.OthersList>
                </Styled.OthersArea>
            }
        </Styled.Wrapper>
    );
}

export default AdPage;