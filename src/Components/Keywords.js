import '../styles.css'

function keywords() {
    return( <div className="sentiment-content">
    {/* <p><strong>Speaker 0:</strong></p> */}
    <p>Good evening. Thank you for calling ITC. My name is Saneera.</p>
    <p className="sentiment-details">
        <em>Keywords:</em> good evening, thank, itc, saneera &nbsp;&nbsp;&nbsp;&nbsp; 
    </p>
    <br/>
    <p>Hello. Hello sir, I'm calling from Chennai. Hello</p>
    <p className="sentiment-details">
        <em>Keywords:</em> hello, hello, chennai, hello &nbsp;&nbsp;&nbsp;&nbsp; 

    </p>
</div>);
}

export default keywords;