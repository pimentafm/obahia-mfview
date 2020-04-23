import React, { useState, useEffect } from 'react';
import ReactHtmlParser from 'react-html-parser';
import lgd from '~/services/legend';

import { LegendContainer } from './styles';

const Legend = props => {
    const [legendHTML, setlegendHTML] = useState([]);

    useEffect(() => {
        lgd.get(`cgi-bin/mapserv.fcgi?map=/var/www/geodb/mapfiles/`+props.name+`.map&mode=legend`, {
            responseType: 'text',
        },
        ).then(res => {
            let html = res.data;

            html = ReactHtmlParser(html)
            
            setlegendHTML(html)
        });
    }, [props.name]);

    return (
        <LegendContainer>
            {legendHTML}
        </LegendContainer>
    )
}

export default Legend;
