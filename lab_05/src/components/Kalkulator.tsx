import { IonAlert, IonCard, IonCardContent, IonButton, IonGrid, IonRow, IonCol } from '@ionic/react';
import { useState } from 'react';

const Kalkulator: React.FC = () => {

  const [wyswietlacz, setWyswietlacz] = useState('0');
  const [poprzedniaLiczba, setPoprzedniaLiczba] = useState<number | null>(null);
  const [dzialanie, setDzialanie] = useState<string | null>(null);
  const [nowaLiczba, setNowaLiczba] = useState(false);
  const [pokazAlert, setPokazAlert] = useState(false);

  const wyczysc = () => {
    setWyswietlacz('0');
    setPoprzedniaLiczba(null);
    setDzialanie(null);
    setNowaLiczba(false);
  };

  const dopisz = (znak: string) => {
    if (nowaLiczba) {
      setWyswietlacz(znak === '.' ? '0.' : znak);
      setNowaLiczba(false);
      return;
    }

    if (znak === '.' && wyswietlacz.includes('.'))
      return;

    setWyswietlacz(wyswietlacz === '0' && znak !== '.' ? znak : wyswietlacz + znak);
  };

  const wybierzDzialanie = (noweDzialanie: string) => {
    const liczba = Number(wyswietlacz);

    if (!Number.isFinite(liczba))
      return;

    setPoprzedniaLiczba(liczba);
    setDzialanie(noweDzialanie);
    setNowaLiczba(true);
  };

  const oblicz = () => {

    if (poprzedniaLiczba === null || dzialanie === null || nowaLiczba)
      return;

    const drugaLiczba = Number(wyswietlacz);
    let wynik: number;

    if (dzialanie === '÷' && drugaLiczba === 0) {
      wyczysc();
      setPokazAlert(true);
      return;
    }

    switch (dzialanie) {
      case '+': wynik = poprzedniaLiczba + drugaLiczba; break;
      case '-': wynik = poprzedniaLiczba - drugaLiczba; break;
      case '×': wynik = poprzedniaLiczba * drugaLiczba; break;
      case '÷': wynik = poprzedniaLiczba / drugaLiczba; break;
      default:
        return;
    }

    setWyswietlacz(String(parseFloat(wynik.toFixed(10))));
    setPoprzedniaLiczba(null);
    setDzialanie(null);
    setNowaLiczba(true);
  };

  return (
    <IonCard>
      <IonCardContent>
        <IonRow>
          <IonCol>
            <h1>{wyswietlacz}</h1>
          </IonCol>
        </IonRow>
        <IonGrid>
          <IonRow>
            <IonCol size="3">
              <IonButton onClick={() => dopisz('7')}>
                7
              </IonButton>
            </IonCol>
            <IonCol size="3">
              <IonButton onClick={() => dopisz('8')}>
                8
              </IonButton>
            </IonCol>
            <IonCol size="3">
              <IonButton onClick={() => dopisz('9')}>
                9
              </IonButton>
            </IonCol>
            <IonCol size="3">
              <IonButton onClick={() => wybierzDzialanie('÷')}>
                ÷
              </IonButton>
            </IonCol>
          </IonRow>

          <IonRow>
            <IonCol size="3">
              <IonButton onClick={() => dopisz('4')}>
                4
              </IonButton>
            </IonCol>
            <IonCol size="3">
              <IonButton onClick={() => dopisz('5')}>
                5
              </IonButton>
            </IonCol>
            <IonCol size="3">
              <IonButton onClick={() => dopisz('6')}>
                6
              </IonButton>
            </IonCol>
            <IonCol size="3">
              <IonButton onClick={() => wybierzDzialanie('×')}>
                ×
              </IonButton>
            </IonCol>
          </IonRow>

          <IonRow>
            <IonCol size="3">
              <IonButton onClick={() => dopisz('1')}>
                1
              </IonButton>
            </IonCol>
            <IonCol size="3">
              <IonButton onClick={() => dopisz('2')}>
                2
              </IonButton>
            </IonCol>
            <IonCol size="3">
              <IonButton onClick={() => dopisz('3')}>
                3
              </IonButton>
            </IonCol>
            <IonCol size="3">
              <IonButton onClick={() => wybierzDzialanie('-')}>
                -
              </IonButton>
            </IonCol>
          </IonRow>

          <IonRow>
            <IonCol size="3">
              <IonButton onClick={wyczysc}>
                C
              </IonButton>
            </IonCol>
            <IonCol size="3">
              <IonButton onClick={() => dopisz('0')}>
                0
              </IonButton>
            </IonCol>
            <IonCol size="3">
              <IonButton onClick={() => dopisz('.')}>
                .
              </IonButton>
            </IonCol>
            <IonCol size="3">
              <IonButton onClick={() => wybierzDzialanie('+')}>
                +
              </IonButton>
            </IonCol>
          </IonRow>

          <IonRow>
            <IonCol size="3"></IonCol>
            <IonCol size="3"></IonCol>
            <IonCol size="3"></IonCol>
            <IonCol size="3">
              <IonButton onClick={oblicz}>
                =
              </IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
        <IonAlert
          isOpen={pokazAlert}
          header="Błąd"
          message="Nie można dzielić przez zero"
          buttons={['OK']}
          onDidDismiss={() => setPokazAlert(false)}
        />
      </IonCardContent>
    </IonCard>
  );
};
export default Kalkulator;
