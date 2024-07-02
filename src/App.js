import React, { useState, useEffect } from 'react';

const calculateHourlyRate = (competitorPrice, numUnits, hoursPerWeek, competitorDiscount) => {
  const baseCost = 17.50;
  const unitFactor = 1 + (numUnits / 5000); // up to 10% premium for 500 units in a building
  const hoursFactor = 1 - (hoursPerWeek / (24 * 7) * 0.1);
  const finalPrice = competitorPrice * (1 - competitorDiscount) * unitFactor * hoursFactor;
  const grossMargin = ((finalPrice - baseCost) / finalPrice) * 100;
  return {
    hourlyRate: Math.round(finalPrice * 100) / 100,
    baseCost,
    unitPremium: (unitFactor - 1) * 100, // Convert to percentage
    hoursDiscount: (1 - hoursFactor) * 100, // Convert to percentage
    grossMargin: Math.round(grossMargin * 100) / 100
  };
};

const PricingApp = () => {
  const [competitorPrice, setCompetitorPrice] = useState(25);
  const [numUnits, setNumUnits] = useState(200);
  const [hoursPerWeek, setHoursPerWeek] = useState(168);
  const [competitorDiscount, setCompetitorDiscount] = useState(0.05);
  const [calculationDetails, setCalculationDetails] = useState({});

  useEffect(() => {
    setCalculationDetails(calculateHourlyRate(competitorPrice, numUnits, hoursPerWeek, competitorDiscount));
  }, [competitorPrice, numUnits, hoursPerWeek, competitorDiscount]);

  const containerStyle = {
    minHeight: '100vh',
    backgroundColor: '#f5f5f7',
    padding: '48px 16px',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Inter", Roboto, Helvetica, Arial, sans-serif',
  };

  const cardStyle = {
    maxWidth: '800px',
    margin: '0 auto',
    backgroundColor: 'white',
    borderRadius: '18px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    padding: '32px',
  };

  const titleStyle = {
    fontSize: '32px',
    fontWeight: '600',
    color: '#1d1d1f',
    textAlign: 'center',
    marginBottom: '32px',
  };

  const rateStyle = {
    fontSize: '48px',
    fontWeight: '700',
    color: '#1d1d1f',
    marginBottom: '8px',
  };

  const subtitleStyle = {
    fontSize: '16px',
    color: '#86868b',
    marginBottom: '32px',
  };

  const inputContainerStyle = {
    marginBottom: '24px',
  };

  const labelStyle = {
    fontSize: '14px',
    fontWeight: '500',
    color: '#1d1d1f',
    marginBottom: '8px',
    display: 'block',
  };

  const inputStyle = {
    width: '100%',
    padding: '8px',
    fontSize: '16px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    marginBottom: '16px',
  };

  const detailsStyle = {
    marginTop: '32px',
    padding: '16px',
    backgroundColor: '#f2f2f7',
    borderRadius: '12px',
  };

  const detailItemStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '8px',
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <h1 style={titleStyle}>Concierge Pricing Model</h1>
        
        <div>
          <h2 style={rateStyle}>${calculationDetails.hourlyRate?.toFixed(2)}/hour</h2>
          <p style={subtitleStyle}>Suggested hourly rate based on your inputs</p>
        </div>

        <div>
          <div style={inputContainerStyle}>
            <label style={labelStyle}>
              Competitor Price: 
            </label>
            <input
              type="number"
              value={competitorPrice}
              onChange={(e) => setCompetitorPrice(Number(e.target.value))}
              style={inputStyle}
            />
          </div>

          <div style={inputContainerStyle}>
            <label style={labelStyle}>
              Number of Units: 
            </label>
            <input
              type="number"
              value={numUnits}
              onChange={(e) => setNumUnits(Number(e.target.value))}
              style={inputStyle}
            />
          </div>

          <div style={inputContainerStyle}>
            <label style={labelStyle}>
              Hours per Week: 
            </label>
            <input
              type="number"
              value={hoursPerWeek}
              onChange={(e) => setHoursPerWeek(Number(e.target.value))}
              style={inputStyle}
            />
          </div>

          <div style={inputContainerStyle}>
            <label style={labelStyle}>
              Competitor Discount: 
            </label>
            <input
              type="number"
              value={competitorDiscount}
              onChange={(e) => setCompetitorDiscount(Number(e.target.value))}
              style={inputStyle}
            />
          </div>
        </div>

        <div style={detailsStyle}>
          <h3 style={{fontSize: '18px', fontWeight: '600', marginBottom: '16px'}}>Calculation Details</h3>
          <div style={detailItemStyle}>
            <span>Base Cost:</span>
            <span>${calculationDetails.baseCost?.toFixed(2)}</span>
          </div>
          <div style={detailItemStyle}>
            <span>Number of Units Premium:</span>
            <span>{calculationDetails.unitPremium?.toFixed(2)}%</span>
          </div>
          <div style={detailItemStyle}>
            <span>Hours Discount:</span>
            <span>{calculationDetails.hoursDiscount?.toFixed(2)}%</span>
          </div>
          <div style={detailItemStyle}>
            <span>Gross Margin:</span>
            <span>{calculationDetails.grossMargin?.toFixed(2)}%</span>
          </div>
          <div style={{ ...detailItemStyle, fontWeight: '500', marginTop: '16px' }}>
            <span>Note:</span>
            <span>The target gross margin is preferred to be 27% or more.</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingApp;
