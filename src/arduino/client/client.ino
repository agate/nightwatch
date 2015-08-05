#include <SPI.h>
#include <Mirf.h>
#include <nRF24L01.h>
#include <MirfHardwareSpiDriver.h>

int ONOFF_PIN = 2;
int STATUS_ON = 1;
int STATUS_OFF = 0;
int status;

void setup() {
  Serial.begin(9600);

  Mirf.spi = &MirfHardwareSpi;
  Mirf.init();
  Mirf.payload = sizeof(unsigned int);
  Mirf.channel = 11;
  Mirf.config();

  Serial.println("Client Started...");

  pinMode(ONOFF_PIN, INPUT);
}

void loop() {
  if (digitalRead(ONOFF_PIN) == HIGH) {
    status = STATUS_OFF;
    Serial.println("Closed");
  } else {
    status = STATUS_ON;
    Serial.println("Opening");
  }

  Mirf.setTADDR((byte *)"GW");
  Mirf.send((int *)&status);
  while(Mirf.isSending()){}

  delay(1000);
  Serial.println("Sent status to server");
}
