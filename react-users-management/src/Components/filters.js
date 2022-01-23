import { Card, Form, Button } from 'react-bootstrap';
import React, { useState, useRef, useEffect } from 'react';

import { useSelector } from "react-redux";
import { filterUsers } from "../Store/actionInvoker";

function MyFilters() {
    const [gender, setGender] = useState('');
    const birthYearRef = useRef(null);
    const countryRef = useRef(null);
    const cityRef = useRef(null);
    const titleRef = useRef(null);
    const fullUsers = useSelector((state) => state.users);

    useEffect(
        () => {
            filterUsers(fullUsers, {});
        },
        [fullUsers]);

    function onGenderSelectionChange(e) {
        if (gender !== e.target.value)
            setGender(e.target.value);
    }

    function onGenderSelectionClick(e) {
        if (gender === e.target.value)
            setGender('');
    }

    function onFind() {
        let filters = {};

        setNonEmptyProp(filters, "gender", gender);
        setNonEmptyProp(filters, "birthYear", birthYearRef.current.value);
        setNonEmptyProp(filters, "location.country", countryRef.current.value);
        setNonEmptyProp(filters, "location.city", cityRef.current.value);
        setNonEmptyProp(filters, "title", titleRef.current.value);

        filterUsers(fullUsers, filters);
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
                    <Form.Group className="mb-3" id="t">
                        <Form.Label>Title</Form.Label>
                        <Form.Select ref={titleRef} aria-label="Title select">
                            <option value=""></option>
                            <option value="mr">Mr</option>
                            <option value="mrs">Mrs</option>
                            <option value="miss">Miss</option>
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3" id="gender">
                        <Form.Label>Gender</Form.Label>
                        <Form.Check
                            type="radio"
                            label="Male"
                            value="male"
                            id="gender-male"
                            onChange={(e) => onGenderSelectionChange(e)}
                            onClick={(e) => onGenderSelectionClick(e)}
                            checked={gender === "male"}
                        />
                        <Form.Check
                            type="radio"
                            label="Female"
                            value="female"
                            id="gender-female"
                            onChange={(e) => onGenderSelectionChange(e)}
                            onClick={(e) => onGenderSelectionClick(e)}
                            checked={gender === "female"}
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
