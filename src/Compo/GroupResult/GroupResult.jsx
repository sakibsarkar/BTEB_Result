import "./GroupResult.css";
import ResultCard from "../ResultCard/ResultCard";
import axios from "axios";
import { useEffect, useState } from "react";

const GroupResult = () => {
    const [courseType, setCourseType] = useState("diploma in engineering")
    const [semster, setSemester] = useState("Select Semester")
    const [inVadlidStartRoll, setInVadlidStartRoll] = useState(false)
    const [inVadlidEndRoll, setInVadlidEndtRoll] = useState(false)
    const [searchValue, setSearchValue] = useState("showAll")
    const NanStyle = { color: "red", textDecoration: "underline", transition: "0.5s" }
    const [getResult, setGetResult] = useState(false)
    const [groupResult, setGroupResult] = useState(null)
    const [resultLength, setResultLength] = useState(null)
    const [rollError, setRollError] = useState(false)


    useEffect(() => {

        // https://btebresultsbd.com/api/group?startRoll=654139&endRoll=654140&semester=3rd&technology=diploma%20in%20engineering
        if (getResult) {
            fetch("/data.json")
                .then(res => res.json())
                .then(data => {
                    setGroupResult(data)
                    setGetResult(false)
                })
            return
        }

    }, [getResult])


    const handleCheckIsNumberStartRoll = (e) => {
        const typed = e.target.value
        if (isNaN(typed) || typed.includes(".")) {
            setInVadlidStartRoll(true)
        }

        else {
            setInVadlidStartRoll(false)
        }
    }
    const handleCheckIsNumberEndRoll = (e) => {
        const typed = e.target.value
        if (isNaN(typed) || typed.includes(".")) {
            setInVadlidEndtRoll(true)
        }
        else {
            setInVadlidEndtRoll(false)
        }
    }


    const handleShowSearchData = (e) => {
        if (e.target.value == "") {
            setSearchValue("showAll")
            return
        }

        setSearchValue(e.target.value)

    }


    const handleGroupResultSubmit = async (e) => {
        e.preventDefault()

        const { startRoll, endRoll } = e.target

        if (inVadlidStartRoll || inVadlidEndRoll) {
            return alert("Invalid Roll Number")
        }

        if (semster == "Select Semester") {
            return alert("select semester")
        }

        if (parseInt(startRoll.value) >= parseInt(endRoll.value)) {
            console.log(startRoll.value, endRoll.value)
            return setRollError(true)
        }



        // setGetResult(true)
        setRollError(false)

        setResultLength([startRoll.value, endRoll.value])
        try {
            const response = await axios.get(`http://localhost:5000/data?startRoll=${startRoll.value}&endRoll=${endRoll.value}&semester=${semster}&technology=${courseType}`)



            setGroupResult(response.data)
        }

        catch (err) {
            console.log(err)
        }





    }


    console.log(groupResult)

    return (
        <div className="groupResultInfoBox">


            <div className="wrapper">
                <form onSubmit={handleGroupResultSubmit}>
                    <h1>Group Based Result</h1>
                    <select value={courseType} onChange={(e) => setCourseType(e.target.value)}>
                        <option value="diploma in engineering">DIPLOMA IN ENGINEERING</option>
                    </select>

                    <select value={semster} onChange={(e) => setSemester(e.target.value)}>
                        <option value="Select Semester">Select Semester</option>
                        <option value="1st">1st</option>
                        <option value="2nd">2nd</option>
                        <option value="3rd">3rd</option>
                        <option value="4th">4th</option>
                        <option value="5th">5th</option>
                        <option value="6th">6th</option>
                        <option value="7th">7th</option>
                        <option value="8th">8th</option>
                    </select>


                    <div className="bros">
                        <input type="text" style={inVadlidStartRoll ? NanStyle : {}} onKeyUp={handleCheckIsNumberStartRoll} placeholder="Start Roll" name="startRoll" required />
                        <input type="text" style={inVadlidEndRoll ? NanStyle : {}} onKeyUp={handleCheckIsNumberEndRoll} placeholder="End Roll" name="endRoll" required />

                        {rollError ? <p className="rollError">*End roll can't be lessthan or equal to start roll*</p> : ""}
                    </div>

                    <button type="submit">Submit</button>




                </form>


                {
                    groupResult ?

                        <div className="cover">
                            <div className="results">

                                <h1>Roll {resultLength ? resultLength[0] : ""} to {resultLength ? resultLength[1] : ""} | Semester - {semster} | {groupResult?.result[0].regulation}</h1>
                                <div className="cross" onClick={() => setGroupResult(null)}>
                                    <h1>X</h1>
                                </div>
                                <div>
                                    <input type="number" placeholder="Search Roll in group" onChange={handleShowSearchData} />
                                </div>
                                <div className="resultCardContainer">
                                    {groupResult?.result.map((result, index) => <ResultCard result={result} searchValue={searchValue} key={index}></ResultCard>)}

                                </div>

                                <div className="developer">
                                    <h1>Developed by : <a target="_blank" rel="noreferrer" href="https://facebook.com/me.facebook.id">Sakib</a></h1>
                                </div>
                            </div>
                        </div>

                        :
                        ""
                }
            </div>


        </div>
    );
};

// 

export default GroupResult;