import React from 'react';
import { useNavigate } from 'react-router-dom';

function Unauthorized() {
  const navigate = useNavigate();
  return (
    <div style={{ display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', height:'100vh', gap:'1rem' }}>
      <h1 style={{ fontSize:'2rem', color:'#DC3545' }}>403 — Access Denied</h1>
      <p style={{ color:'#6C757D' }}>You do not have permission to view this page.</p>
      <button onClick={() => navigate(-1)} style={{ padding:'0.5rem 1.5rem', background:'#005A9C', color:'#fff', border:'none', borderRadius:'6px' }}>
        Go Back
      </button>
    </div>
  );
}

export default Unauthorized;
