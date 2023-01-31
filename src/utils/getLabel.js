import React from 'react';
import { FlagTwoTone } from '@ant-design/icons';

const fieldLabelConfig = {
  zotero_search: {
    label: 'Zotero',
    access: ['public', 'public', 'private']
  },
  zotero_id: {
    label: 'Imported Zotero record',
    access: ['public', 'public', 'private']
  },
  zotero_language: {
    label: 'Language (Zotero)',
    access: ['public', 'public', 'private']
  },
  zotero_author: {
    label: 'Author (Zotero)',
    access: ['public', 'public', 'private']
  },
  zotero_publication_title: {
    label: 'Publication Title (Zotero)',
    access: ['public', 'public', 'private']
  },
  zotero_date: {
    label: 'Date (Zotero)',
    access: ['public', 'public', 'private']
  },
  zotero_archive: {
    label: 'Archive (Zotero)',
    access: ['public', 'public', 'private']
  },
  zotero_loc_archive: {
    label: 'Archive location (Zotero)',
    access: ['public', 'public', 'private']
  },
  title: {
    label: 'Title',
    access: ['public', 'public', 'private'],
  },
  item_type: {
    label: 'Item type',
    access: ['public', 'public', 'private']
  },
  dates: {
    label: 'Date(s)',
    access: ['public', 'team', 'private']
  },
  abstract: {
    label: 'Document abstract',
    access: ['public', 'team', 'private']
  },
  summary: {
    label: 'Overall summary',
    access: ['team', 'team', 'private']
  },
  keywords: {
    label: 'Other keywords for document',
    access: ['public', 'team', 'private']
  },
  events: {
    label: 'Chronology',
    access: ['public', 'team', 'private']
  },
  people: {
    label: 'People',
    access: ['public', 'team', 'private']
  },
  places: {
    label: 'Places',
    access: ['public', 'team', 'private']
  },
  organisations: {
    label: 'Organizations',
    access: ['public', 'team', 'private']
  },
  activist_repertoire: {
    label: 'Action',
    access: ['public', 'team', 'private']
  },
  activist_repertoire_scale: {
    label: 'Scale of repertoire actions',
    access: ['public', 'team', 'private']
  },
  format_of_participation: {
    label: 'Format of participation',
    access: ['public', 'team', 'private']
  },
  knowledge_production: {
    label: 'Communication and knowledge production',
    access: ['public', 'team', 'private']
  },
  activist_repertoire_explanation: {
    label: 'Specific factors/events triggering repertoire actions',
    access: ['team', 'team', 'private']
  },
  triggering_factor_keywords: {
    label: 'Free keywords relating to triggering factors/events',
    access: ['public', 'team', 'private']
  },
  agendas: {
    label: 'Agendas',
    access: ['public', 'team', 'private']
  },
  agendas_explanation: {
    label: 'Further explanation of agendas',
    access: ['team', 'team', 'private']
  },
  effects_of_activism: {
    label: 'Actisivm effects',
    access: ['public', 'team', 'private']
  },
  effects_of_activism_explanation: {
    label: 'Further explanation of effects of activism',
    access: ['team', 'team', 'private']
  },
  labour_relations: {
    label: 'Labour relations',
    access: ['public', 'team', 'private']
  },
  labour_relations_explanation: {
    label: 'Further explanation of labour relations',
    access: ['team', 'team', 'private']
  },
  labour_conditions: {
    label: 'Labour conditions',
    access: ['public', 'team', 'private']
  },
  labour_conditions_explanation: {
    label: 'Further explanation of labour conditions',
    access: ['team', 'team', 'private']
  },
  living_conditions: {
    label: 'Living conditions',
    access: ['public', 'team', 'private']
  },
  living_conditions_explanation: {
    label: 'Further explanation of living conditions',
    access: ['team', 'team', 'private']
  },
  historical_context: {
    label: 'Historical context',
    access: ['public', 'public', 'private']
  },
  historical_context_explanation: {
    label: 'Further explanation of historical context (including reflections on gender and labour regime)',
    access: ['team', 'team', 'private']
  },
  activism_broad_patterns: {
    label: 'Broad patterns of activism and non-activism',
    access: ['team', 'team', 'private']
  },
  activism_broad_patterns_explanation: {
    label: 'Further explanation of pattern of (non)activism',
    access: ['team', 'team', 'private']
  },
  additional_research: {
    label: 'Additional research and interpretative notes/ideas',
    access: ['team', 'private', 'private']
  },
  interview_consents: {
    label: 'Interview consents',
    access: ['team', 'team', 'private']
  },
  document_permissions: {
    label: 'Document permissions',
    access: ['team', 'team', 'private']
  },
  cc: {
    label: 'Creative Commons License display',
    access: ['team', 'team', 'private']
  }
};

const getLabel = (field, formValues) => {
  const type = formValues['record_type'];

  const getIcon = (access) => {
    switch(access) {
      case 'public':
        return <FlagTwoTone twoToneColor={'#45a321'}/>;
      case 'team':
        return <FlagTwoTone twoToneColor={'#c8b800'}/>;
      case 'private':
        return <FlagTwoTone twoToneColor={'#ed4600'}/>;
      default:
        break;
    }
  };

  if (fieldLabelConfig.hasOwnProperty(field)) {
    const config = fieldLabelConfig[field];
    switch(type) {
      case 'default':
        return <span>{config['label']} {getIcon(config['access'][0])}</span>;
      case 'team':
        return <span>{config['label']} {getIcon(config['access'][1])}</span>;
      case 'individual':
        return <span>{config['label']} {getIcon(config['access'][2])}</span>;
      default:
        break;
    }
  } else {
    return ''
  }
};

export default getLabel;
