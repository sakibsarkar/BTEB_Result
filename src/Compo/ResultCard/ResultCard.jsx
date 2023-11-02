import "./ResultCard.css";

const ResultCard = ({ searchValue, result }) => {

    // fail-     background: "#fbe5e5", color: "#ff6c6c;"
    // pass-     background: "##e4ffe4", color: "##1cc141;"


    const { _id, technology, results, semester, regulation, Date, roll, institute } = result ? result : {}


    const failStyle = { background: "#fbe5e5", color: "#ff6c6c" }
    const passStyle = { background: "#e4ffe4", color: "#1cc141" }

    const failedSubjects = results?.failed ? results.failed.split("{")[1].trim().split("}")[0].trim() : false

    return (<>


    

        {
            searchValue == "showAll" ?
                <div className="cardWrapper">
                    <div className="resultCard" style={results?.passed ? passStyle : failStyle}>
                        <div>
                            <h3>{institute}</h3>
                            <div className="resultInfo">
                                <p>Semeseter :{semester}</p>
                                <p>Roll : {roll ? roll : "unavailable"}</p>
                                <h4>{results?.gpa ? `CGPA: ${results.gpa} (passed)` : `failed: ${failedSubjects}`}</h4>
                            </div>
                        </div>
                    </div>
                </div>
                :
                <div style={roll.includes(searchValue) ? { display: "flex" } : { display: "none" }} className="cardWrapper">
                    <div className="resultCard" style={results?.passed ? passStyle : failStyle}>
                        <div>
                            <h3>{institute}</h3>
                            <div className="resultInfo">
                                <p>Semeseter :{semester}</p>
                                <p>Roll : {roll ? roll : "unavailable"}</p>
                                <h4>{results?.gpa ? `CGPA: ${results.gpa} (passed)` : `failed: ${failedSubjects}`}</h4>
                            </div>
                        </div>
                    </div>
                </div>
        }
    </>
    );
};

export default ResultCard;