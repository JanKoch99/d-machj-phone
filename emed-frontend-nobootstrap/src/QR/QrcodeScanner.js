import React, {Component, useCallback} from 'react'
import QrReader from 'react-qr-scanner'
import {Route, Routes, useNavigate} from "react-router-dom";
import ScanVerify from "../pharmacy/scanVerify";
import {withRouter} from "../withRouter"

class QrcodeScanner extends Component {
  constructor(props){
    super(props)
    this.state = {
        stoppingScan: false,
          delay: 500,
          result: 'No result',
    }
    this.handleScan = this.handleScan.bind(this);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
      if (prevState.result !== this.state.result) {
          this.fetchAndCompare(this.state.result);
      }
  }

    fetchAndCompare(scandata) {
        if (this.props.role === 'Apotheker') {

            if (scandata.role !== 'Patient') { //parse scandaten, falls QRCODE nicht von uns
                // -> Scanerror
            } else {
                return fetch('http://https://mighty-plains-35170.herokuapp.com/patientdata/' + scandata.id, {
                    method: 'GET',
                    body: scandata
                })
                    .then(data => {
                        this.props.setQrscann(data);
                        this.setState({changePath:true})
                        this.props.navigate('pharmacy/scan-verify')
                        // gib personendata weiter zu verify
                    })
            }
        }
        else {
            // zur downloadseite von den patienten
        }
    }


  handleScan(data){
      if (data != null) {
          this.setState({
              result: data,
          })
      }
  }

  render(){
    const previewStyle = {
      height: 400,
      width: 500,
    }
      let stopscan = this.state.stoppingScan;
    return(
      <div>
          {!stopscan &&
              <QrReader
                  delay={this.state.delay}
                  style={previewStyle}
                  onError={(e) => console.error(e)}
                  onScan={(data) => {
                      this.handleScan(data)
                  }}

              />
          }
      </div>

    )
  }
}
export default withRouter(QrcodeScanner);
