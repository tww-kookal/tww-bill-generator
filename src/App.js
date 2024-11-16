import React, { useState, useRef, useEffect } from 'react';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

function App() {

  useEffect(() => {
    document.title = 'The Westwood - Receipt Generator';
  }, []);

  const [formData, setFormData] = useState({
    bookingId: 'TWW-CEDAR-OCT24-01', bookingDate: new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }), guestName: '', totalRentAmount: 0.0,
    numberOfNights: 0, numberOfPeople: 0, extraChildren: 0, voluntaryDiscount: 0, agentCommission: 0,
    propertyDiscount: 0, advancePaid: 0, idCardType: "", idCardNumber: "", checkInDate: new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }), checkOutDate: new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  });

  const [selectedRooms, setSelectedRooms] = useState({
    Cedar: false,
    Pine: false,
    Teak: false,
    Maple: false,
    Tent: false,
  });  

  const [gst, setGST] = useState(0);
  const [rentBasePrice, setRentBasePrice] = useState(0);
  const [balanceToBePaid, setBalanceToBePaid] = useState(0);
  const [effectivePropertyRentPrice, setEffectivePropertyRentPrice] = useState(0);

  const contentRef = useRef();
  const GOV_GST = 0.18;

  const countSelectedRooms = () => {
    return Object.values(selectedRooms).filter((value) => value === true).length;
  };

  const handleSelectedRoomsChange = (event) => {
    const { name, checked } = event.target;
    setSelectedRooms((prevState) => ({
      ...prevState,
      [name]: checked,
    }));
    console.log("Selc " + JSON.stringify(selectedRooms))
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const calculateValues = () => {
    setRentBasePrice(Math.round(formData.totalRentAmount / (1 + GOV_GST)));
    setGST(Math.round(formData.totalRentAmount - Math.round(formData.totalRentAmount / (1 + GOV_GST))));
    setBalanceToBePaid(Math.round(formData.totalRentAmount - formData.advancePaid));
  }

  const loadValues = (e) => {
    e.preventDefault();
    calculateValues();
  };

  const generatePdf = async () => {
    calculateValues();
    const content = contentRef.current;
    const canvas = await html2canvas(content);
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF();
    pdf.addImage(imgData, 'PNG', 10, 10, 180, 160);
    pdf.save('BILL_' + formData.bookingId + '_' + formData.guestName + '_' + formData.checkInDate + '.pdf');
  };

  return (
    <div className="App">
      <h1>The Westwood </h1>
      <h2>Receipt Generator</h2>
      <form>
        <table style={{ border: 0 }}>
          <tr>
            <td>
              <label>Booking ID:</label>
            </td>
            <td>
              <input type="text" name="bookingId" value={formData.bookingId} onChange={handleChange} />
            </td>
          </tr>
          <tr>
            <td>
              <label>Booking Date:</label>
            </td>
            <td>
              <input type="text" name="bookingDate" value={formData.bookingDate} onChange={handleChange} />
            </td>
          </tr>
          <tr>
            <td>
              <label>Check In Date:</label>
            </td>
            <td>
              <input type="text" name="checkInDate" value={formData.checkInDate} onChange={handleChange} />
            </td>
          </tr>
          <tr>
            <td>
              <label>Check Out Date:</label>
            </td>
            <td>
              <input type="text" name="checkOutDate" value={formData.checkOutDate} onChange={handleChange} />
            </td>
          </tr>
          <tr>
            <td>
              <label>Guest Name:</label>
            </td>
            <td>
              <input type="text" name="guestName" value={formData.guestName} onChange={handleChange} />
            </td>
          </tr>
          <tr>
            <td>
              <label>Total Rent Amount:</label>
            </td>
            <td>
              <input type="text" name="totalRentAmount" value={formData.totalRentAmount}
                onChange={handleChange} />
            </td>
          </tr>
          <tr>
            <td>
              <label>Rooms Booked:</label>
            </td>
            <td>
              <input type="checkbox" name="Cedar" checked={selectedRooms.Cedar} onChange={handleSelectedRoomsChange} /> Cedar
              <input type="checkbox" name="Pine" checked={selectedRooms.Pine} onChange={handleSelectedRoomsChange} /> Pine
              <input type="checkbox" name="Teak" checked={selectedRooms.Teak} onChange={handleSelectedRoomsChange} /> Teak
              <input type="checkbox" name="Maple" checked={selectedRooms.Maple} onChange={handleSelectedRoomsChange} /> Maple
              <input type="checkbox" name="Tent" checked={selectedRooms.Tent} onChange={handleSelectedRoomsChange} /> Tent
            </td>
          </tr>
          <tr>
            <td>
              <label>Number Of Nights:</label>
            </td>
            <td>
              <input type="text" name="numberOfNights" value={formData.numberOfNights} onChange={handleChange} />
            </td>
          </tr>
          <tr>
            <td>
              <label>Number Of People:</label>
            </td>
            <td>
              <input type="text" name="numberOfPeople" value={formData.numberOfPeople} onChange={handleChange} />
            </td>
          </tr>
          <tr>
            <td>
              <label>ID Card Type:</label>
            </td>
            <td>
              <select name="idCardType" onChange={handleChange}>
                <option value="">--Select One--</option>
                <option value="PAN Card">Pan Card</option>
                <option value="Aadhar Card">Aadhar Card</option>
                <option value="Driving License">Driving License</option>
                <option value="Voter ID">Voter ID</option>
              </select>

            </td>
          </tr>
          <tr>
            <td>
              <label>ID Card Number:</label>
            </td>
            <td>
              <input type="text" name="idCardNumber" value={formData.idCardNumber} onChange={handleChange} />
            </td>
          </tr>
          <tr>
            <td>
              <label>Advance Paid:</label>
            </td>
            <td>
              <input type="text" name="advancePaid" value={formData.advancePaid} onChange={handleChange} />
            </td>
          </tr>
          <tr>
            <td colspan="2">
              <center> <button onClick={loadValues}>Preview</button></center>
            </td>
          </tr>
        </table>
      </form>
      <div ref={contentRef} style={{width: '97%', padding: '20px', marginTop: '20px', border: '1px solid #ccc' }}>
        <table style={{ borderWidth: 0, width: '100%' }} >
          <tr style={{ width: '100%' }}>
            <td style={{ width: '50%' }}><big><big><big><big><big><big>Host Receipt</big></big></big></big></big></big></td>
            <td align="right"><img src="./images/westwoodlogo2.png" style={{ width: '50%', height: '50%' }} alt="The Westwood"></img>
              <br />
              Survey No 380, Kookal Main Road,
            </td>
          </tr>
          <tr>
            <td><label>Booking ID - <strong>{formData.bookingId}</strong></label></td>
            <td align="right">
              Kookal, Kodaikanal, Tamilnadu
              <br />
              9884855014, thewestwood.kookal@gmail.com
            </td>
          </tr>
          <tr>
            <td><label>Booking Date - {formData.bookingDate} </label></td>
            <td align="right">https://www.thewestwood.in/</td>
          </tr>
          <tr>
            <td colspan="2">
              <hr />
            </td>
          </tr>
          <tr>
            <td colspan="2"><label><strong>Dear {formData.guestName},</strong></label></td>
          </tr>
          <tr>
            <td colspan="2"><label>The Westwood has received a booking at our property as per the details below.
              Kindly carry this e-voucher while check in.</label></td>
          </tr>
          <tr>
            <td colspan="2"><label>&nbsp;</label></td>
          </tr>
          <tr>
            <td colspan="2"><label>For your reference, Booking ID is <strong>{formData.bookingId}.</strong></label>
            </td>
          </tr>
          <tr>
            <td colspan="2"><label><strong>Total amount payable for this booking is INR {formData.totalRentAmount}/- as per
              the details below.</strong></label></td>
          </tr>
          <tr>
            <td colspan="2"><label>Kindly consider this e-voucher for booking confirmation with the following
              inclusions and services.</label></td>
          </tr>
          <tr>
            <td colspan="2">
              <hr />
            </td>
          </tr>
          <tr>
            <td colspan="2">
              <center>
                <table width="98%">

                  <tr>
                    <td><label><strong>Paymnent Breakup</strong></label></td>
                    <td align="right"><small><font style={{ color: 'darkgray' }}>All prices indicated below are in INR </font></small></td>
                  </tr>
                  <tr>
                    <td colspan="2"><font style={{ color: 'darkgray' }}>TARRIF</font></td>
                  </tr>
                  <tr>
                    <td><label>
                      Property Sell Price<br />
                      <font style={{ color: 'darkgray' }}>{countSelectedRooms()} Room(s) x {formData.numberOfNights} Night(s)</font>
                    </label></td>
                    <td align="right"> &nbsp;<br />{rentBasePrice} </td>
                  </tr>
                  <tr>
                    <td colspan="2">
                      <hr />
                    </td>
                  </tr>
                  <tr>
                    <td><label>Extra Adult / Child Charges</label></td>
                    <td align="right"> {formData.extraChildren} </td>
                  </tr>
                  <tr>
                    <td colspan="2">
                      <hr />
                    </td>
                  </tr>
                  <tr>
                    <td><label>Voluntary Property Driven
                      Coupon Discount </label></td>
                    <td align="right"> {formData.voluntaryDiscount} </td>
                  </tr>
                  <tr>
                    <td colspan="2">
                      <hr />
                    </td>
                  </tr>
                  <tr>
                    <td><label>Effective Property Sell Price</label></td>
                    <td align="right"> {rentBasePrice} </td>
                  </tr>
                  <tr>
                    <td colspan="2">
                      <hr />
                    </td>
                  </tr>
                  <tr>
                    <td><label>Property Gross Charges </label></td>
                    <td align="right"> {rentBasePrice} </td>
                  </tr>
                  <tr>
                    <td colspan="2">
                      <hr />
                    </td>
                  </tr>
                  <tr>
                    <td><label>Agent Commission</label></td>
                    <td align="right"> {formData.agentCommission} </td>
                  </tr>
                  <tr>
                    <td colspan="2">
                      <hr />
                    </td>
                  </tr>
                  <tr>
                    <td><label>GST @ 18%</label><br /><font style={{ color: 'darkgray' }}>(Including IGST or (SGST & CGST))</font></td>
                    <td align="right"> {gst} </td>
                  </tr>
                  <tr>
                    <td colspan="2">
                      <hr />
                    </td>
                  </tr>
                  <tr>
                    <td><label>Property discount including tax considered in
                      coupon promotion</label></td>
                    <td align="right"> {formData.propertyDiscount} </td>
                  </tr>
                  <tr>
                    <td colspan="2">
                      <hr />
                    </td>
                  </tr>
                  <tr>
                    <td><label>Total</label></td>
                    <td align="right"> {formData.totalRentAmount} </td>
                  </tr>
                  <tr>
                    <td colspan="2">
                      <hr />
                    </td>
                  </tr>
                  <tr>
                    <td><label>Advance Paid </label></td>
                    <td align="right"> {formData.advancePaid} </td>
                  </tr>
                  <tr>
                    <td colspan="2">
                      <hr />
                    </td>
                  </tr>
                  <tr>
                    <td><label>Balance to be paid while check in</label></td>
                    <td align="right"> {balanceToBePaid} </td>
                  </tr>
                  <tr>
                    <td colspan="2">
                      <hr />
                    </td>
                  </tr>
                  <tr>
                    <td colspan="2"><label><small><font style={{ color: 'darkgray' }}>Service Category - Reservation of property booking</font></small>
                    </label></td>
                  </tr>
                </table>
              </center>
            </td>
          </tr>
          <tr>
            <td colspan="2"><hr /></td>
          </tr>
          <tr>
            <td colspan="2"><big><stong>Booking Details</stong></big></td>
          </tr>
          <tr>
            <td style={{ width: '25%' }}>
              <big><stong>{formData.numberOfNights} NIGHT(S)</stong></big>
            </td>
            <td style={{ width: '75%' }}>
              <table style={{ width: '100%;' }}>
                <tr style={{ width: '100%;' }}>
                  <td style={{ width: '33%', textAlign: 'center' }}>
                    <font style={{ color: 'darkgray' }}>Check-In</font>
                  </td>
                  <td style={{ width: '33%', textAlign: 'center' }}>

                  </td>
                  <td style={{ width: '33%', textAlign: 'center' }}>
                    <font style={{ color: 'darkgray' }}>Check-Out</font>
                  </td>
                </tr>
                <tr>
                  <td style={{ width: '33%', textAlign: 'center' }}>
                    {formData.checkInDate}
                  </td>
                  <td style={{ width: '33%', textAlign: 'center' }}>
                    <hr style={{ color: 'darkgray' }} />
                  </td>
                  <td style={{ width: '33%', textAlign: 'center' }}>
                    {formData.checkOutDate}
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td ><big><stong>Guest Details</stong></big></td>
            <td ><big><stong>Stay Details</stong></big></td>
          </tr>
          <tr>
            <td ><b>Name: </b> {formData.guestName} </td>
            <td ><stong>Rooms Booked: </stong><small>
              {Object.keys(selectedRooms).map((key) => (
                  selectedRooms[key] && key + ', '
              ))}
            </small>
            </td>
          </tr>
          <tr>
            <td ><stong>Identification Type: </stong> {formData.idCardType}</td>
            <td ><stong>{formData.numberOfPeople} People</stong></td>
          </tr>
          <tr>
            <td colspan="2"><stong>Identification Number: </stong> {formData.idCardNumber}</td>
          </tr>
          <tr>
            <td colspan="2"><stong><font style={{ color: 'darkgray' }}>Inclusions:</font></stong></td>
          </tr>
          <tr>
            <td ><stong>Complimentary Breakfast is available for all days of the stay.</stong></td>
            <td ><stong>Pets are not allowed</stong></td>
          </tr>
          <tr>
            <td colspan="2">
              <hr />
            </td>
          </tr>
          <tr>
            <td colspan="2" align='center'>
              <button onClick={generatePdf}>Download as PDF</button>
            </td>
          </tr>
        </table>
      </div>
    </div>
  );
}

export default App;
