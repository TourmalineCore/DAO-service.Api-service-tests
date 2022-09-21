import * as React from "react";
import WalletConnect from "@walletconnect/client";
import QRCodeModal from "@walletconnect/qrcode-modal";
import Button from "./components/Button";
import Column from "./components/Column";
import Wrapper from "./components/Wrapper";

function download(filename: any, text: any){
  const blob = new Blob([text], {type: "text/plain"});
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
}

const walletConnectParams = {
  bridge: 'https://bridge.walletconnect.org', // Required
  qrcodeModal: QRCodeModal,
  clientMeta: {
    description: 'ninDAO DApp',
    url: 'https://nindao.xyz',
    icons: ['https://walletconnect.org/walletconnect-logo.png'], // default icon TODO: replace with our
    name: 'ninDAO'
  }
}

interface IAppState {
  connector: WalletConnect | null;
}

const INITIAL_STATE: IAppState = {
  connector: null,
};

class App extends React.Component<any, any> {
  public state: IAppState = {
    ...INITIAL_STATE,
  };

  public connect = async () => {
    const connector = new WalletConnect(walletConnectParams);

    this.setState({ connector });

    if (!connector.connected) {
      await connector.createSession();
    }

    connector.on("connect", (error, payload) => {
      console.log(`connector.on("connect")`);
      
      // exportFile(JSON.stringify(connector.session), {fileName: 'sessionData'});
      download("sessionData.txt", JSON.stringify(connector.session));

      if (error) {
        throw error;
      }

      // console.log(connector.session);

      console.log(connector.session);

      this.setState({
        connected: true,
        connector
      });
    });
  };

  public disconnect = async () => {
    const { connector } = this.state;
    if (connector) {
      connector.killSession();
    }

    this.setState({ ...INITIAL_STATE });
  };

  public render = () => {
    const connected = this.state.connector?.connected;

    return (
      <div>
        <Column maxWidth={1000} spanHeight>
          <Wrapper>
            {
              connected ? (
                <div>
                  <Column center>
                    <Button onClick={this.disconnect}>
                      Disconnect
                    </Button>
                    <h3>Done</h3>
                  </Column>
                </div>
              ) : (
                <div>
                  <h3>
                    HyperDao example
                  </h3>
                  <Column center>
                    <Button onClick={this.connect}>
                      Connect
                    </Button>
                  </Column>
                </div>
              )
            }
          </Wrapper>
        </Column>
      </div>
    );
  };
}

export default App;
