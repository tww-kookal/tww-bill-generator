module.exports = function (props) {
    return (
        <div className="App">
            <h1>Generate PDF from HTML</h1>
            <form>
                <label>
                    Booking ID:
                    <input
                        type="text"
                        name="bookingId"
                        value={formData.bookingId}
                        onChange={handleChange}
                    />
                </label>
                <br />
                <label>
                    Booking Date:
                    <input
                        type="text"
                        name="bookingDate"
                        value={formData.bookingDate}
                        onChange={handleChange}
                    />
                </label>
                <br />
                <label>
                    Guest Name:
                    <input
                        type="text"
                        name="guestName"
                        value={formData.guestName}
                        onChange={handleChange}
                    />
                </label>
                <br />
                <label>
                    Total Rent Amount:
                    <input
                        type="text"
                        name="totalRentAmount"
                        value={formData.totalRentAmount}
                        onChange={handleChange}
                    />
                </label>
                <br />
                <label>
                    Description:
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                    />
                </label>
            </form>
            <div ref={contentRef} style={{ padding: '20px', marginTop: '20px', border: '1px solid #ccc' }}>
                <h2>Preview</h2>
                <p><img src="/images/westwoodlogo2.png" style={{ width: 100, height: 20 }}></img></p>
                <p><strong>Booking ID:</strong> {formData.bookingId}</p>
                <p><strong>Booking Date:</strong> {formData.bookingDate}</p>
                <p><strong>Guest Name:</strong> {formData.guestName}</p>
                <p><strong>Total Rent Amount:</strong> {formData.totalRentAmount}</p>
                <p><strong>Description:</strong> {formData.description}</p>
            </div>
            <button onClick={generatePdf}>Download as PDF</button>
        </div>
    );
};