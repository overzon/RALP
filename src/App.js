// import React from 'react';
// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './App.css';
import firebase from './Firebase';


class App extends Component {
  constructor(props) {
    super(props);
    this.ref = firebase.firestore().collection('travels');
    this.unsubscribe = null;
    this.state = {
      boards: []
    };
  }

  onCollectionUpdate = (querySnapshot) => {
    const boards = [];
    querySnapshot.forEach((doc) => {
      const { travelname, description, address ,image, image360, lat, lng, star, travelclose, travelopen  } = doc.data();
      boards.push({
        key: doc.id,
        travelname, description, address ,image, image360, lat, lng, star, travelclose, travelopen
      });
    });
    this.setState({
      boards
   });
  }

  componentDidMount() {
    this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
  }

  render() {
    return (
      <div class="container">
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-title">
              รายการสถานที่ท่องเที่ยว
            </h3>
          </div>
          <div class="panel-body">
            <h4><Link to="/create">เพิ่มสถานที่ท่องเที่ยว</Link></h4>
            <table class="table table-stripe">
              <thead>
                <tr>
                  <th>สถานที่ท่องเที่ยว</th>
                  <th>รายละเอียด</th>
                  <th>ที่อยู่</th>
                  <th>คะแนน</th>
                  <th>เปิด</th>
                  <th>ปิด</th>
                  <th>lat</th>
                  <th>lng</th>
                </tr>
              </thead>
              <tbody>
                {this.state.boards.map(board =>
                  <tr>
                    <td><Link to={`/show/${board.key}`}>{board.travelname}</Link></td>
                    <td>{board.description}</td>
                    <td>{board.address}</td>
                    <td>{board.star}</td>
                    <td>{board.travelopen}</td>
                    <td>{board.travelclose}</td>
                    <td>{board.lat}</td>
                    <td>{board.lng}</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default App;