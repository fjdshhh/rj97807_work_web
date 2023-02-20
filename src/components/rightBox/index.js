import React, { useEffect, useState } from "react";
import { Button, Input } from "antd";
import style from "./index.module.scss";
export default function ChatBox(prop) {
  const [msgList, setMsgList] = useState([]);
  const [submitMsg, setSubmitMsg] = useState("");
  useEffect(() => {
    console.log(prop);
    if (prop.msg.message != null) {
      console.log("存", prop.msg.message);
      setMsgList([...msgList, prop.msg.message]);
    }
    return () => {};
  }, [prop]);

  // useEffect(() => {
  //   function ListItem() {
  //     return msgList.map((item) => {
  //       return <li key={item}>{item}</li>;
  //     });
  //   }
  //   ListItem();
  //   return () => {};
  // }, [msgList]);

  return (
    <div className={style.box}>
      <ul>
        {msgList.map((item) => {
          return <li key={item}>{item}</li>;
        })}
      </ul>
      <Input.Group className={style.submit}>
        <Input
          defaultValue="你想说啥"
          value={submitMsg}
          onChange={(e) => {
            setSubmitMsg(e.target.value);
          }}
        />
        <Button
          type="primary"
          onClick={() => {
            prop.so.send(JSON.stringify({ message: submitMsg }));
            setMsgList([...msgList, submitMsg]);
          }}
        >
          发送
        </Button>
      </Input.Group>
    </div>
  );
}
