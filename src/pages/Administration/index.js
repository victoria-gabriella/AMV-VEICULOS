import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Header from '../../components/Header';
import Input from '../../components/Input';
import firebase from '../../services/api'
import Button from '../../components/Button'
import OfferItem from  '../../components/OfferItem';
import ImgLogo from '../../assets/logo.png'
import './styles.css';

const Administration = () => {
  const [offers, setOffers] = useState([])
  const [filteredOffers, setFilteredOffers] = useState([])
  const [isUpdate, setIsUpdate] = useState(false);
  const [id, setId] = useState('')
  const [brand, setBrand] = useState('')
  const [model, setModel] = useState('')
  const [price, setPrice] = useState('')
  const [year, setYear] = useState('')

  async function handleDeleteOffer(id) {
    firebase
      .firestore()
      .collection('offers')
      .doc(id)
      .delete()
      .then(() => {
        console.log('Document successfully deleted!')

        setOffers(offers.filter((offer) => offer.id !== id))
      })
      .catch((error) => {
        console.error('Error removing document: ', error)
      })
  }

  async function handleDataLoadingUpdate(id) {
    setIsUpdate(true);
    offers.map(offer => {
      if (offer.id === id) {
        setId(offer.id);
        setBrand(offer.brand);
        setModel(offer.model);
        setPrice(offer.price);
        setYear(offer.year);
      }
      return null;
    })
  }

  async function handleUpdateOffer(id) {
    firebase
      .firestore()  
      .collection("offers")
      .doc(id)
      .update({
        brand,
        model,
        price,
        year
    });

    setIsUpdate(false);
  }

  async function handleSearchOffer(search) {
    (search.length === 0) ? setFilteredOffers(offers)
    : setFilteredOffers(offers.filter((offer) => offer.brand.includes(search)));
  }

  useEffect(() => {
    firebase
      .firestore()
      .collection('offers')
      .onSnapshot((snapshot) => {
        const offersList = snapshot.docs.map((doc) => {
          return {
            id: doc.id,
            brand: doc.data().brand,
            model: doc.data().model,
            price: doc.data().price,
            year: doc.data().year,
            views: doc.data().views,
          }
        })
        setOffers(offersList)
        setFilteredOffers(offersList)
      })
  }, [])

  return (
    <>
      <Header 
          linkHome="/"
          logo={ImgLogo}
          logoAlt="AMV veiculos"
          nameLinkOne="Offers"
          nameLinkTwo="Administration"
        />
      <div className="container">
        <div className="content">
          <h1 className="title-adm">Adm</h1>
          {!isUpdate &&
            <>
              <small>{"Search"}</small>
              <Input 
                placeholder="Search for the offer by car brand name. Ex: Fiat"
                onChange={function (e) {
                  handleSearchOffer(e.target.value)
                }}
              />
  
              <ul className="list-items">
                {filteredOffers.map(item => (
                  <OfferItem 
                    key={item.id}
                    brand={item.brand}
                    model={item.model}
                    onClickEdit={() =>  handleDataLoadingUpdate(item.id)}
                    onClickDelete={() => handleDeleteOffer(item.id)}
                  >
                  </OfferItem>
                ))}
              </ul>
              <Link to='/newoffer'>
                <Button
                  name="Add New Offer"
                  className="blue"
                />
              </Link>
            </>
          }

          {isUpdate &&
            <>
              <h3>Update Offer</h3>
              <form action="">
                {"Brand"}
                <Input
                  placeholder="Ex: Fiat"
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                />
                {"Model"}
                <Input
                  placeholder="Ex: Beetle"
                  value={model}
                  onChange={(e) => setModel(e.target.value)}
                />
                {"Price"}
                <Input
                  placeholder='In reais'
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
                {"Year"}
                <Input
                  placeholder='Ex: 2005'
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                />
              </form>
              <Button
                name="Save"
                className="blue"
                onClick={() => handleUpdateOffer(id)}
              />
              <Button
                name="Cancel"
                className="orange"
                onClick={() => setIsUpdate(false)}
              />
            </>
          }
        </div>
      </div>
    </>
  )
}

export default Administration
