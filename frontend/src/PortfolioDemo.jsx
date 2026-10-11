import React, { useEffect, useState } from 'react';
import { API_BASE_URL } from './api-config';
import './PortfolioDemo.css';

export default function PortfolioDemo() {
  const [records, setRecords] = useState([]);
  const [name, setName] = useState('SQL practice');
  const [criterion, setCriterion] = useState('Query correctness');
  const [score, setScore] = useState(100);
  const [status, setStatus] = useState('Loading criteria…');
  const [busy, setBusy] = useState(false);
  async function load() {
    const response = await fetch(API_BASE_URL + '/details');
    if (!response.ok) throw new Error('Could not load criteria. Start the local backend and MongoDB.');
    setRecords(await response.json());
  }
  useEffect(() => { load().then(() => setStatus('Connected to the local assessment database.')).catch(error => setStatus(error.message)); }, []);
  async function create(event) {
    event.preventDefault(); setBusy(true);
    try {
      const response = await fetch(API_BASE_URL + '/details/add', { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({courseId:'DEMO-'+Date.now(),courseName:name,type:'Assignment',details:[{details_columnName:criterion,details_maxScore:String(score),details_notes:'Synthetic local demonstration'}]}) });
      if (!response.ok) throw new Error('Could not save criteria.');
      await load(); setStatus('Assessment criterion saved.');
    } catch(error) { setStatus(error.message); } finally { setBusy(false); }
  }
  async function remove(record) {
    setBusy(true);
    try {
      const response = await fetch(API_BASE_URL + '/details/delete/'+encodeURIComponent(record.courseId)+'/'+encodeURIComponent(record.type),{method:'DELETE'});
      if (!response.ok) throw new Error('Could not delete criteria.');
      await load(); setStatus('Demo criterion deleted.');
    } catch(error) { setStatus(error.message); } finally { setBusy(false); }
  }
  return <main className="assessment-demo">
    <header><strong>CorrectionApp</strong><span>LOCAL DEMONSTRATION</span></header>
    <section className="assessment-intro"><p>01 / ASSESSMENT SETUP</p><h1>Clear criteria.<br/>Consistent assessment.</h1><p>A connected React, Node and MongoDB demonstration using synthetic records. Institutional login and archive execution are separate workflows.</p></section>
    <div className="assessment-grid"><form onSubmit={create}><h2>Create a criterion</h2><label htmlFor="course-name">Course</label><input id="course-name" value={name} onChange={event=>setName(event.target.value)} maxLength={120} required/><label htmlFor="criterion">Criterion</label><input id="criterion" value={criterion} onChange={event=>setCriterion(event.target.value)} maxLength={120} required/><label htmlFor="maximum-score">Maximum score</label><input id="maximum-score" type="number" min="1" max="1000" value={score} onChange={event=>setScore(event.target.value)} required/><button disabled={busy}>Save criterion</button></form>
    <section><h2>Assessment criteria <small>{records.length}</small></h2><p role="status">{status}</p><div className="assessment-table"><table><thead><tr><th>Course</th><th>Criterion</th><th>Maximum</th><th>Action</th></tr></thead><tbody>{records.map(record=><tr key={record._id}><td>{record.courseName}</td><td>{record.details?.[0]?.details_columnName || '—'}</td><td>{record.details?.[0]?.details_maxScore || '—'}</td><td>{record.courseId.startsWith('DEMO-') && <button className="assessment-delete" disabled={busy} onClick={()=>remove(record)} aria-label={'Delete demo '+record.courseName}>Delete demo</button>}</td></tr>)}</tbody></table></div>{records.length===0 && <p className="assessment-empty">No criteria yet. Add a synthetic example to try the workflow.</p>}</section></div>
    <footer>Local criteria CRUD only. No institutional credentials or real student records are required.</footer>
  </main>;
}
