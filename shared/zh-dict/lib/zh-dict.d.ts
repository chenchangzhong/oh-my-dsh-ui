declare const ZH: {
    conversation: {
        'message.retry.status': string;
    };
    model: {
        retry: string;
    };
    cordis: {
        'panel.trigger': string;
        'panel.runningCount': string;
    };
    '*': {
        retry: string;
        submit: string;
        submitting: string;
        save: string;
        cancel: string;
        close: string;
        copy: string;
        copied: string;
        delete: string;
        edit: string;
        open: string;
        search: string;
        settings: string;
        none: string;
        unknown: string;
        done: string;
        failed: string;
        running: string;
        stopped: string;
        completed: string;
        pending: string;
        idle: string;
        error: string;
        ok: string;
        back: string;
        next: string;
        previous: string;
        more: string;
        expand: string;
        collapse: string;
        truncated: string;
        loading: string;
        'load.failed': string;
        empty: string;
        warning: string;
        success: string;
        confirm: string;
        apply: string;
        reset: string;
        remove: string;
        add: string;
        rename: string;
        refresh: string;
        reload: string;
        view: string;
        preview: string;
        details: string;
        status: string;
        options: string;
        general: string;
        language: string;
        appearance: string;
    };
};
declare const ZH_PARTIAL: {
    conversation: {
        'stats.llm': string[];
        'stats.ttftAverage': string[];
        'stats.tokensPerSecond': string[];
        'stats.tokens': string[];
        'access.confirm.title': string[];
        'access.confirm.description': string[];
        'access.confirm.enable': string[];
        'message.compaction.completed': string[];
        'message.unknownSurface': string[];
        'message.maxTokens': string[];
        'message.ttft': string[];
        'message.tokensPerSecond': string[];
    };
    trajectory: {
        'toolbar.duration': string[];
        'toolbar.useActualDuration': string[];
        'toolbar.useEqualWidth': string[];
        'toolbar.turns': string[];
        'toolbar.expandTurns': string[];
        'toolbar.collapseTurns': string[];
        'toolbar.calls': string[];
        'toolbar.expandCalls': string[];
        'toolbar.collapseCalls': string[];
    };
    'settings.models': {
        intro: string[];
        deleteDescriptionWithCredential: string[];
        credentialConfigured: string[];
        credentialMissing: string[];
        keyInput: string[];
        keyPlaceholder: string[];
        keyPlaceholderNative: string[];
        keyBlank: string[];
        keyBlankNew: string[];
        keyIllegalCharacters: string[];
        baseUrl: string[];
        modelId: string[];
        modelNamePlaceholder: string[];
        maxTokens: string[];
        modelsEmpty: string[];
        modelIdRequired: string[];
        modelIdDuplicate: string[];
        modelDuplicate: string[];
        modelMaxTokens: string[];
        fetchNeedsBaseUrl: string[];
        customRoute: string[];
        customRouteTaken: string[];
        customApi: string[];
        customNeedsBaseUrl: string[];
        onboardingTitle: string[];
        keyRequired: string[];
    };
    'settings.plugins': {
        bashDescription: string[];
        agentLoopTitle: string[];
        agentLoopDescription: string[];
        webSearchApiKey: string[];
    };
    'settings.agentPreset': {
        title: string[];
        error: string[];
        seatHint: string[];
        headerHint: string[];
        nav: string[];
        sectionIntro: string[];
        presetStandardDescription: string[];
        presetCodeName: string[];
        presetCodeDescription: string[];
        presetMinimalDescription: string[];
        presetCordisDescription: string[];
    };
    'settings.permission': {
        'confirm.title': string[];
        'confirm.description': string[];
        'confirm.enable': string[];
    };
    'permission.access': {
        'confirm.title': string[];
        'confirm.description': string[];
        'confirm.enable': string[];
    };
    plan: {
        'chip.on.aria': string[];
        'chip.on.title': string[];
        'chip.off.aria': string[];
        'chip.off.title': string[];
    };
    skill: {
        'row.running': string[];
        'row.failed': string[];
        'row.stopped': string[];
    };
    model: {
        'effort.providerDefault': string[];
    };
    'settings.pluginInventory': {
        cordis: string[];
    };
    'session-log-download': {
        'dialog.preparingTitle': string[];
        'dialog.preparingDescription': string[];
        'dialog.successTitle': string[];
        'dialog.successDescription': string[];
        'dialog.errorTitle': string[];
        'dialog.commandFailed': string[];
    };
};
export { ZH, ZH_PARTIAL };
