import { Card, Form, Button } from 'react-bootstrap';
import React, { useState, useRef } from 'react';


function MyFilters({ filterUsers }) {
    const [gender, setGender] = useState('');
    const birthYearRef = useRef(null);
    const countryRef = useRef(null);
    const cityRef = useRef(null);

    function onGenderSelectionChange(e) {
        if (gender !== e.target.value)
            setGender(e.target.value);
    }

    function onGenderSelectionClick(e) {
        if (gender == e.target.value)
            setGender('');
    }

    function onFind() {
        let filters = {};

        setNonEmptyProp(filters, "gender", gender);
        setNonEmptyProp(filters, "birthYear", birthYearRef.current.value);
        setNonEmptyProp(filters, "location.country", countryRef.current.value);
        setNonEmptyProp(filters, "location.city", cityRef.current.value);

        filterUsers(filters);
    }

    //set prop only if non empty
    function setNonEmptyProp(filters, propName, propVal) {
        if (propVal) {
            if (propName.indexOf('.') > 0) {
                let parentProp = propName.substring(0, propName.indexOf('.'));
                let childProp = propName.substring(parentProp.length, propName.length);

                childProp = childProp.replace('.', '');

                if (!filters.hasOwnProperty(parentProp))
                    filters[parentProp] = {};

                filters[parentProp][childProp] = propVal;
            }
            else {
                filters[propName] = propVal;
            }
        }
    }

    function ensureNumericInput(e) {
        if (e.key === '') {
            console.log('IN 1')
            return;
        }

        if (isNaN(e.key)) {
            e.preventDefault();
            e.stopPropagation();
            alert('Birth year can only be numeric value!')
        }
    }

    return (
        <Card>
            <Card.Body>
                <Card.Title>Filters</Card.Title>
                <Form>
                    <Form.Group className="mb-3" id="gender">
                        <Form.Label>Gender</Form.Label>
                        <Form.Check
                            type="radio"
                            label="Male"
                            value="Male"
                            id="gender-male"
                            onChange={(e) => onGenderSelectionChange(e)}
                            onClick={(e) => onGenderSelectionClick(e)}
                            checked={gender === "Male"}
                        />
                        <Form.Check
                            type="radio"
                            label="Female"
                            value="Female"
                            id="gender-female"
                            onChange={(e) => onGenderSelectionChange(e)}
                            onClick={(e) => onGenderSelectionClick(e)}
                            checked={gender === "Female"}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" id="birthYear">
                        <Form.Label>Birth year</Form.Label>
                        <Form.Control type="text" ref={birthYearRef} onKeyPress={(e) => { ensureNumericInput(e) }} />
                    </Form.Group>
                    <Form.Group className="mb-3" id="country">
                        <Form.Label>Country</Form.Label>
                        <Form.Control type="text" ref={countryRef} />
                    </Form.Group>
                    <Form.Group className="mb-3" id="city">
                        <Form.Label>City</Form.Label>
                        <Form.Control type="text" ref={cityRef} />
                    </Form.Group>

                    <Button onClick={onFind}>
                        Find
                    </Button>
                </Form>
            </Card.Body>
        </Card>
    )
}

export default MyFilters;
