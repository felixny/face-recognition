import React from "react";

const Rank = ({name, entry}) => {
    console.log('name', name);
    console.log('entry', entry);
    return (
        <div >
            <div className="white f3">
                {`${name}, Your current entry count is...`}
            </div>
            <div className="white f1">
                {entry}
            </div>
        </div>

    );
}

export default Rank;