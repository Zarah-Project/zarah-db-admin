import React, {useState} from 'react';
import {Input} from "antd";
import {FormItem} from "formik-antd";
import metadata from "../../../services/metadata";
import ZoteroItems from "./ZoteroItems";
import getLabel from "../../../utils/getLabel";

const {Search} = Input;

const ZoteroSearch = ({values, setFieldValue, action, ...props}) => {
  const [loading, setLoading] = useState(false);
  const [zoteroItems, setZoteroItems] = useState([]);

  const onSearch = (value) => {
    const data = [];
    setLoading(true);
    metadata.zotero(value).then((response) => {
      response.data.forEach((d) => {
        data.push(d.data)
      });
      setZoteroItems(data);
      setLoading(false);
    })
  };

  const onSelect = (value) => {
    setFieldValue("title", value['title']);
    setFieldValue("item_type", value['itemType']);
    setFieldValue("zotero_id", value['key']);
    setFieldValue("zotero_data", JSON.stringify(value));

    setFieldValue("zotero_language", value['language']);
    setFieldValue("zotero_date", value['date']);

    setFieldValue("zotero_archive", value['archive']);
    setFieldValue("zotero_loc_archive", value['archiveLocation']);

    if (value.hasOwnProperty('creators')) {
      const authors = value['creators'].map((creator) => {
        return `${creator['firstName']} ${creator['lastName']} (${creator['creatorType']})`
      });
      setFieldValue("zotero_author", authors.join('; '));
    }

    setZoteroItems([]);
  };

  return (
    <React.Fragment>
      {
        action !== 'view' ?
        <FormItem label={getLabel('zotero_search', values)} name={'zotero_search'}>
          <Search
            placeholder="Search in Zotero..."
            style={{ width: '100%' }}
            onSearch={onSearch}
            enterButton
            loading={loading}
          />
          <ZoteroItems
            values={values}
            setFieldValue={setFieldValue}
            zoteroItems={zoteroItems}
            onSelect={onSelect}
          />
        </FormItem> :
        <ZoteroItems
          action={action}
          values={values}
          setFieldValue={setFieldValue}
          zoteroItems={zoteroItems}
          onSelect={onSelect}
        />
      }
    </React.Fragment>
  )
};

export default ZoteroSearch;
