#include <SPI.h>
#include <Mirf.h>
#include <nRF24L01.h>
#include <MirfHardwareSpiDriver.h>

void setup() {
  Serial.begin(9600);

  Mirf.spi = &MirfHardwareSpi;
  Mirf.init();
  Mirf.setRADDR((byte *)"GW");
  Mirf.payload = sizeof(unsigned int);
  Mirf.channel = 11;
  Mirf.config();

  Serial.println("Server Started...");
}

void loop() {
  byte data[Mirf.payload];

  if (!Mirf.isSending() && Mirf.dataReady()) {
    Mirf.getData(data);
    Serial.println(data[0] == 0 ? "0" : "1");
  }
}
