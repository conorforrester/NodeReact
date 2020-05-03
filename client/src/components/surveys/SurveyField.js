// SurveyField contains logic to render a single lable and text input

import React from 'react';

export default ({ input }) => {

    return (
        <div>
            <input {...input} />
        </div>
    );
};