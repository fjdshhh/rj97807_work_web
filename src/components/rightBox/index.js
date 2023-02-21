import React, { useEffect, useState } from "react";
import { Button, Input } from "antd";
import style from "./index.module.scss";
export default function ChatBox(prop) {
  const [msgList, setMsgList] = useState([]);
  const [submitMsg, setSubmitMsg] = useState("");
  useEffect(() => {
    if (prop.msg.message != undefined) {
      console.log("存", prop.msg.message);
      setMsgList([...msgList, prop.msg.message]);
    }
    return () => {};
  }, [prop.msg]);

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
      <ul className={style.msgBox}>
        {msgList.map((item, index) => {
          return <li key={index}>{item}</li>;
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
            if (submitMsg !== "") {
              prop.so.send(JSON.stringify({ message: submitMsg }));
              setMsgList([...msgList, submitMsg]);
              setSubmitMsg("");
            }
          }}
        >
          发送
        </Button>
      </Input.Group>
    </div>
  );
}
