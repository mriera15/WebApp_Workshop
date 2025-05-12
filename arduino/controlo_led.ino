int ledPin = 13;

void setup() {
  pinMode(ledPin, OUTPUT);
  Serial.begin(9600);
}

void loop() {
  if (Serial.available()) {
    char comando = Serial.read();
    if (comando == '1') {
      digitalWrite(ledPin, HIGH);
    } else if (comando == '0') {
      digitalWrite(ledPin, LOW);
    }
  }
}