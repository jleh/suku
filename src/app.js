import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { renderToStaticMarkup } from 'react-dom/server';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { withLocalize, Translate } from 'react-localize-redux';

import './app.css';

import translations from './translations/translations.json';

import { getWorldEvents, getData, getPlaces } from './api';
import { addPersonsAction, addPlacesAction, addWorldEventsAction } from './actions';

import Header from './components/Header';
import AncestorTree from './components/AncestorTree';
import Person from './components/Person';
import Timeline from './components/Timeline';
import Places from './components/Places';
import PersonList from './components/PersonList';
import Place from './components/Places/Place';
import Blog from './components/Blog';
import FrontPage from './components/FrontPage';

const App = ({ initialize }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { updated, data, personList } = useSelector((state) => state.persons);
  const { placesById } = useSelector((state) => state.places);

  useEffect(() => {
    initialize({
      languages: ['fi'],
      translation: translations,
      options: { renderToStaticMarkup },
    });
  }, []);

  useEffect(() => {
    getData().then((personData) => dispatch(addPersonsAction(personData)));
    getWorldEvents().then((worldEvents) => dispatch(addWorldEventsAction(worldEvents)));
    getPlaces().then((placesData) => dispatch(addPlacesAction(placesData)));
  }, []);

  const personSelected = (selectedPerson) => {
    navigate(`/person/${selectedPerson.id}`);
  };

  const searchSelect = (itemId) => {
    if (itemId.charAt(0) === 'I') {
      navigate(`/person/${itemId}`);
    } else if (itemId.charAt(0) === 'P') {
      navigate(`/place/${itemId}`);
    }
  };

  if (!data) {
    return (
      <div>
        <Translate id="loading" />
      </div>
    );
  }

  return (
    <div>
      <Header updated={updated} persons={personList} places={placesById} onSelect={searchSelect} />
      <Routes>
        <Route path="/" exact element={<FrontPage personSelected={personSelected} />} />
        <Route path="/timeline" element={<Timeline />} />
        <Route path="/places" element={<Places />} />
        <Route path="/person/:id" element={<Person />} />
        <Route path="/persons" element={<PersonList />} />
        <Route path="/place/:id" element={<Place />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/tree/:id" element={<AncestorTree personSelected={personSelected} />} />
      </Routes>
    </div>
  );
};

export default withLocalize(App);
