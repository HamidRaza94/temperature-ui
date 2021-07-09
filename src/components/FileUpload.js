import React, { Fragment, useState, useEffect } from 'react';
import axios from 'axios';
import Graph from './Graph';

const serverURL = 'http://localhost:9000/api';

const FileUpload = () => {
  const [file, setFile] = useState('');
  const [filename, setFilename] = useState('Choose File');
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(
        `${serverURL}/temperature?startYear=2015&startMonth=2&endYear=2015&endMonth=2`
      );
      const measurements = res.data.data.map((d) => d.measurements);
      setData(measurements[0]);
    };

    fetchData();
  }, []);

  const onChange = (e) => {
    setFile(e.target.files[0]);
    setFilename(e.target.files[0].name);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', file);

    try {
      await axios.post(`${serverURL}/temperature/upload`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      console.log('File uploaded');
    } catch (err) {
      console.log('There is an error:', err);
    }
  };

  return (
    <Fragment>
      <form
        onSubmit={onSubmit}
        style={{ border: '5px solid #FFFF00', textAlign: 'center' }}
      >
        <label className='custom-file-label' htmlFor='customFile'>
          {filename}
        </label>
        <div className='custom-file mb-4' style={{}}>
          <input
            type='file'
            style={{}}
            className='custom-file-input'
            id='customFile'
            onChange={onChange}
          />
        </div>
        <input
          type='submit'
          value='Upload'
          className='btn btn-primary btn-block mt-4'
        />
      </form>
      {data.length ? <Graph style={{ margin: '1em', textAlign: 'centre' }} graphData={data} /> : <></>}
    </Fragment>
  );
};

export default FileUpload;
