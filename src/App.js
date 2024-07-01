import React, { useState, useEffect } from 'react';

const calculateHourlyRate = (competitorPrice, numUnits, hoursPerWeek, minGrossMargin, competitorDiscount) => {
  const baseCost = 17.50;
  const unitFactor = 1 + (numUnits / 1000);
  const hoursFactor = 1 - (hoursPerWeek / (24 * 7) * 0.1);
  const minPrice = baseCost / (1 - minGrossMargin);
  const suggestedPrice = Math.max(minPrice, competitorPrice * (1 - competitorDiscount));
  const finalPrice = suggestedPrice * unitFactor * hoursFactor;
  return {
    hourlyRate: Math.round(finalPrice * 100) / 100,
    baseCost,
    unitPremium: (unitFactor - 1) * 100, // Convert to percentage
    hoursDiscount: (1 - hoursFactor) * 100, // Convert to percentage
    minPrice,
    suggestedPrice
  };
};

const PricingApp = () => {
  const [competitorPrice, setCompetitorPrice] = useState(25);
  const [numUnits, setNumUnits] = useState(200);
  const [hoursPerWeek, setHoursPerWeek] = useState(168);
  const [minGrossMargin, setMinGrossMargin] = useState(0.25);
  const [competitorDiscount, setCompetitorDiscount] = useState(0.05);
  const [calculationDetails, setCalculationDetails] = useState({});

  useEffect(() => {
    setCalculationDetails(calculateHourlyRate(competitorPrice, numUnits, hoursPerWeek, minGrossMargin, competitorDiscount));
  }, [competitorPrice, numUnits, hoursPerWeek, minGrossMargin, competitorDiscount]);

  const containerStyle = {
    minHeight: '100vh',
    backgroundColor: '#f5f5f7',
    padding: '48px 16px',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
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

  const sliderContainerStyle = {
    marginBottom: '24px',
  };

  const labelStyle = {
    fontSize: '14px',
    fontWeight: '500',
    color: '#1d1d1f',
    marginBottom: '8px',
    display: 'block',
  };

  const sliderStyle = {
    width: '100%',
    WebkitAppearance: 'none',
    appearance: 'none',
    height: '4px',
    background: '#0071e3',
    outline: 'none',
    opacity: '0.7',
    transition: 'opacity 0.2s',
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
          <div style={sliderContainerStyle}>
            <label style={labelStyle}>
              Competitor Price: ${competitorPrice}
            </label>
            <input
              type="range"
              min={10}
              max={50}
              step={0.5}
              value={competitorPrice}
              onChange={(e) => setCompetitorPrice(Number(e.target.value))}
              style={sliderStyle}
            />
          </div>

          <div style={sliderContainerStyle}>
            <label style={labelStyle}>
              Number of Units: {numUnits}
            </label>
            <input
              type="range"
              min={1}
              max={1000}
              value={numUnits}
              onChange={(e) => setNumUnits(Number(e.target.value))}
              style={sliderStyle}
            />
          </div>

          <div style={sliderContainerStyle}>
            <label style={labelStyle}>
              Hours per Week: {hoursPerWeek}
            </label>
            <input
              type="range"
              min={1}
              max={168}
              value={hoursPerWeek}
              onChange={(e) => setHoursPerWeek(Number(e.target.value))}
              style={sliderStyle}
            />
          </div>

          <div style={sliderContainerStyle}>
            <label style={labelStyle}>
              Minimum Gross Margin: {(minGrossMargin * 100).toFixed(0)}%
            </label>
            <input
              type="range"
              min={0}
              max={1}
              step={0.01}
              value={minGrossMargin}
              onChange={(e) => setMinGrossMargin(Number(e.target.value))}
              style={sliderStyle}
            />
          </div>

          <div style={sliderContainerStyle}>
            <label style={labelStyle}>
              Competitor Discount: {(competitorDiscount * 100).toFixed(0)}%
            </label>
            <input
              type="range"
              min={0}
              max={0.2}
              step={0.01}
              value={competitorDiscount}
              onChange={(e) => setCompetitorDiscount(Number(e.target.value))}
              style={sliderStyle}
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
            <span>Minimum Price:</span>
            <span>${calculationDetails.minPrice?.toFixed(2)}</span>
          </div>
          <div style={detailItemStyle}>
            <span>Suggested Price (before adjustments):</span>
            <span>${calculationDetails.suggestedPrice?.toFixed(2)}</span>
          </div>
          <div style={detailItemStyle}>
            <span>Final Price:</span>
            <span>${calculationDetails.hourlyRate?.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingApp;
