import React from 'react';

import Header from './Header';
import Person, { PersonProps, PersonDTO } from './Person';
import Footer from './Footer';
import Form from './Form';
import CenteredMsg from './misc/CenteredMsg';

import '../css/App.css';
import { Utils } from './misc/Utils';

interface AppState {
  error: string|null;
  dataIsReceived: boolean;
  
  people: Array<PersonDTO>;
  expandedRowIndex: number;
}

export default class App extends React.Component<{}, AppState> {

  private randomUrl = 'https://randomuser.me/api/';

  constructor(props: any) {
    super(props);

    this.state = {
      error: null,
      dataIsReceived: false,
      people: [],
      expandedRowIndex: -1,
    };

    this.populateWithRandomPpl();
  }

  render() {
    return (
        <div className="App">
          <Header numberOfPpl={this.state.people.length}/>
          <main>
            {this.state.people.length !== 0 ? this.renderPeople() :
                this.state.error ? (
                    <div>
                      <CenteredMsg msg={this.state.error}/>
                    </div>
                   ) :
                    this.state.dataIsReceived ? <CenteredMsg msg='Loading...'/> : <div />
            }
            <Form label='Create New People:'
                  placeHolder='Ramiro Escobar GB 23 0.1...'
                  onSubmit={(data: string) => this.onFormSubmit(data)}/>
          </main>
          <Footer/>
        </div>
    );
  }

  private populateWithRandomPpl = (): void => {
    
    for (var i = 0; i < 25; i++) {
      setTimeout( () =>
        fetch(this.randomUrl)
          .then(res => res.json())
          .then(
            data => {
              const res = data.results[0];
              const person: PersonDTO = {
                first_name: res.name.first,
                last_name: res.name.last,
                age: res.dob.age,
                city_or_cc: res.location.city,
                risk_percentage: Math.round(Math.random() * 100),
              };
              this.setState({ people: [...this.state.people, ...[person]], dataIsReceived: true });
            },
            (err) => {
              this.setState({ error: this.generateErrMsg(err) })
            }
          )
      , 100);
    }
  }

  private renderPeople(): JSX.Element[] {
    return (
      this.state.people.map((person, i) => 
        <Person
                key={i}
                first_name={person.first_name}
                last_name={person.last_name}
                age={person.age}
                city_or_cc={person.city_or_cc}
                risk_percentage={person.risk_percentage}
                expanded={this.state.expandedRowIndex === i}
                onClick={() => this.toggleExpand(i)}
              />
      )
    );
  }

  private toggleExpand = (idx: number) => {
    this.setState({ expandedRowIndex: this.state.expandedRowIndex === idx ? -1 : idx });
  }

  private onFormSubmit = (data: string) => {
    const lines = data.split('\n');

    const newPeople = lines.map((line, i) => {
      const lineValues = line.split(/(\s+)/).filter( e => e.trim().length > 0);
      return Utils.tryExtractPerson(lineValues);
    }).filter((p): p is PersonProps => !!p);

    this.setState({people: [...this.state.people, ...newPeople]});
  }

  private generateErrMsg(e: any): string {
    const message: string = e.message;

    if (message) {
      return message;
    }

    const status: number = e.statusCode;

    if (status >= 400 && status <= 499) {
      return 'There was some problem on a client side';
    }

    if (status >= 500 && status <= 599) {
      return 'There was some problem on a server side';
    }

    return 'Unexpected error';
  }
}
