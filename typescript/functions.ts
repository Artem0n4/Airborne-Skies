/**
 * Function for create array of numbers
 * @returns array included integers begins from 0
 */
const range = function (int: int): int[] {
  const arr: int[] = [];
  for (let i = 0; i < int; i++) {
    arr.push(i);
  }
  return arr;
};

const MathHelper = {
  randomValue: function <T>(...values: T[]): T {
    return values[Math.floor(Math.random() * values.length)];
  },
  radian: function (gradus: int): int {
    return (gradus * Math.PI) / 180;
  },
  randomInt: function (min: int, max: int): int {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  },
};

const ObjectValues = function <T>(obj: {}): T[] {
  return Object.keys(obj).map(function (v) {
    return obj[v];
  });
};

const ArrayHelper = {
  flatAll<T>(array: T[]): T[] {
    return array.reduce(
      (previousValue, currentValue) => previousValue.concat(currentValue),
      []
    );
  },
};

Network.addClientPacket(
  "airborne_skies.clientTipMessage",
  (packetData: { message: string }) => {
    Game.tipMessage(packetData.message);
  }
);

function sendTipMessage(
  client: NetworkClient,
  message: string,
  color: Native.Color | Native.Color[] = Native.Color.WHITE
) {
  if (!client) return;
  if (Array.isArray(color)) {
    message = color
    .reduce((prevValue, currValue) => prevValue.concat(currValue), "")
    .concat(Translation.translate(message));
  } else {
    message = color + Translation.translate(message)
  };
  client.send("airborne_skies.clientTipMessage", {
    message
  });
}
